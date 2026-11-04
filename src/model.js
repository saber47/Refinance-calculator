// Pure financial model; no browser dependencies.
const monthly=(p,r,n)=>{const i=r/1200;return i===0?p/n:p*i/(1-Math.pow(1+i,-n))};
const bal=(p,r,n,k)=>{const i=r/1200,a=monthly(p,r,n);return i===0?p-a*k:p*Math.pow(1+i,k)-a*(Math.pow(1+i,k)-1)/i};
const fv=(m,r,k)=>Math.abs(r)<1e-12?m*k:m*Math.expm1(k*Math.log1p(r))/r;

export function compareMortgages({principal,oldRate,remainingYears,newRate,newYears,fees,financeFees,annualReturn,horizonYears}) {
 const p=principal,old=oldRate,nw=newRate,fee=fees,nOld=Math.round(remainingYears*12),nNew=Math.round(newYears*12),months=Math.round(horizonYears*12),financed=financeFees;
 if(!(p>0&&nOld>0&&nNew>0&&months>0&&months<=Math.max(nOld,nNew)&&old>=0&&nw>=0&&fee>=0&&annualReturn>-100&&Number.isFinite(annualReturn)))throw new RangeError('Invalid assumptions');
 const mret=Math.pow(1+annualReturn/100,1/12)-1,loan=p+(financed?fee:0),oldPay=monthly(p,old,nOld),maxMonths=Math.max(nOld,nNew);
 const calculate=(rate)=>{
  const newPay=monthly(loan,rate,nNew);
  let oldBalance=p,newBalance=loan,oldInterest=0,newInterest=0,cash=financed?0:-fee,invest=cash;
  const rows=[{cash,invest,equity:oldBalance-newBalance,financial:cash+oldBalance-newBalance,adjusted:invest+oldBalance-newBalance,oldBalance,newBalance,oldInterest,newInterest,oldPrincipal:0,newPrincipal:0}];
  for(let k=1;k<=maxMonths;k++){
   const oldActive=k<=nOld,newActive=k<=nNew;
   const oldPayment=oldActive?oldPay:0,newPayment=newActive?newPay:0;
   const oi=oldActive?oldBalance*old/1200:0,ni=newActive?newBalance*rate/1200:0;
   oldInterest+=oi;newInterest+=ni;
   oldBalance=oldActive?(k===nOld?0:Math.max(0,oldBalance+oi-oldPayment)):0;
   newBalance=newActive?(k===nNew?0:Math.max(0,newBalance+ni-newPayment)):0;
   const difference=oldPayment-newPayment;
   cash+=difference;
   invest=invest*(1+mret)+difference;
   const equity=oldBalance-newBalance;
   rows.push({cash,invest,equity,financial:cash+equity,adjusted:invest+equity,oldBalance,newBalance,oldInterest,newInterest,oldPrincipal:p-oldBalance,newPrincipal:loan-newBalance});
  }
  return {newPay,rows};
 };

 const main=calculate(nw),atHorizon=main.rows[months];
 const firstCrossing=fn=>{for(let k=1;k<=maxMonths;k++)if(fn(main.rows[k])>=-1e-7)return k;return null};
 return {oldPay,newPay:main.newPay,maxMonths,months,rows:main.rows,atHorizon,cashBreakEven:financed?null:firstCrossing(y=>y.cash),investmentCashBreakEven:financed?null:firstCrossing(y=>y.invest),financialBreakEven:firstCrossing(y=>y.financial),investmentFinancialBreakEven:firstCrossing(y=>y.adjusted),rateComparison:rate=>{const offer=calculate(rate);return {newPay:offer.newPay,atHorizon:offer.rows[months]}}};
}
