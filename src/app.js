import {compareMortgages} from './model.js';
import {draw} from './chart.js';


const ids=['balance','oldRate','remaining','newRate','fees','feePct','term','feeMode','ret','horizon'];
const el=id=>document.getElementById(id);
const usd=n=>Number.isFinite(n)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n):'—';
let summary='';
function syncFee(source='pct'){
 const p=Number(el('balance').value)||0;
 if(source==='dollars')el('feePct').value=p>0?String(Number(((Number(el('fees').value)||0)/p*100).toFixed(4))):'0';
 else el('fees').value=String(Number((p*(Number(el('feePct').value)||0)/100).toFixed(2)));
 el('feeStatus').textContent='Equivalent to '+(Number(el('feePct').value)||0).toLocaleString('en-US',{maximumFractionDigits:4})+'% of the balance.';
}
function syncHorizon(){
 const max=Math.max(1,Math.round(Number(el('remaining').value)||1),Number(el('term').value)||30);
 el('horizon').max=String(max);
 if(Number(el('horizon').value)>max)el('horizon').value=String(max);
 el('horizonLabel').textContent=el('horizon').value+' '+(el('horizon').value==='1'?'year':'years');
}
function compute(){
 const v=id=>Number(el(id).value),p=v('balance'),old=v('oldRate'),nw=v('newRate'),fee=v('fees'),financed=el('feeMode').value==='financed',annualReturn=v('ret');
 let result;
 try {result=compareMortgages({principal:p,oldRate:old,remainingYears:v('remaining'),newRate:nw,newYears:v('term'),fees:fee,financeFees:financed,annualReturn,horizonYears:v('horizon')});}
 catch {el('wealth').textContent='Check inputs / horizon';return}
 const {oldPay,newPay,months,atHorizon:x,rows}=result;
 const beLabel=k=>k===null?'Not reached within longer loan term':k+' months';
 const fields={savings:oldPay-newPay,interestSaved:x.oldInterest-x.newInterest,wealth:x.financial,oldPay,newPay,oldInterest:x.oldInterest,newInterest:x.newInterest,oldPrincipal:x.oldPrincipal,newPrincipal:x.newPrincipal,oldBalance:x.oldBalance,newBalance:x.newBalance,investmentWealth:x.adjusted};
 for(const [id,val] of Object.entries(fields))el(id).textContent=usd(val);
 el('cashBE').textContent=financed?'N/A — fees financed':beLabel(result.cashBreakEven);
 el('investmentCashBE').textContent=financed?'N/A — fees financed':beLabel(result.investmentCashBreakEven);
 el('financialBE').textContent=beLabel(result.financialBreakEven);el('wealthBE').textContent=beLabel(result.investmentFinancialBreakEven);
 const tbody=el('rateRows');tbody.replaceChildren();
 for(let rate=Math.max(0,Math.floor((nw-1)/.25)*.25);rate<=Math.min(30,nw+1.001);rate+=.25){const offer=result.rateComparison(rate),tr=document.createElement('tr');[rate.toFixed(2)+'%',usd(oldPay-offer.newPay),usd(offer.atHorizon.adjusted)].forEach(t=>{const td=document.createElement('td');td.textContent=t;tr.append(td)});tbody.append(tr)}
 summary=['Mortgage refinance comparison',`Balance: ${usd(p)}`,`Existing rate: ${old}%`,`Remaining term: ${v('remaining')} years`,`New rate: ${nw}%`,`New term: ${v('term')} years`,`Net fees: ${usd(fee)} (${financed?'financed':'cash'})`,`Horizon: ${months/12} years`,`Scheduled monthly savings: ${usd(oldPay-newPay)}`,`Basic cash-flow break-even: ${financed?'N/A — fees financed':beLabel(result.cashBreakEven)}`,`Basic net financial break-even: ${beLabel(result.financialBreakEven)}`,`Basic net financial gain/loss: ${usd(x.financial)}`,`Investment return assumption: ${annualReturn}%`,`Investment-adjusted cash-flow break-even: ${financed?'N/A — fees financed':beLabel(result.investmentCashBreakEven)}`,`Investment-adjusted net financial break-even: ${beLabel(result.investmentFinancialBreakEven)}`,`Investment-adjusted net financial gain/loss: ${usd(x.adjusted)}`,`Remaining old debt: ${usd(x.oldBalance)}`,`Remaining new debt: ${usd(x.newBalance)}`].join('\n');
 if(el('advancedToggle').checked)draw(rows.slice(0,months+1).map(y=>y.financial),rows.slice(0,months+1).map(y=>y.adjusted),months);
}
function syncAdvanced(){const enabled=el('advancedToggle').checked;el('advancedInputs').hidden=!enabled;el('advancedResults').hidden=!enabled;if(enabled)requestAnimationFrame(compute)}
el('advancedToggle').addEventListener('change',syncAdvanced);
ids.forEach(id=>el(id).addEventListener('input',()=>{
 if(id==='fees'||id==='balance')syncFee('dollars');
 else if(id==='feePct')syncFee('pct');
 if(id==='remaining'||id==='term'||id==='horizon')syncHorizon();
 compute();
}));
el('copy').onclick=async()=>{try{await navigator.clipboard.writeText(summary);el('copy').textContent='Copied';setTimeout(()=>el('copy').textContent='Copy summary',1600)}catch{window.prompt('Copy the summary:',summary)}};
document.addEventListener('click',event=>{const btn=event.target.closest('button[data-help]');if(!btn)return;const wasOpen=btn.getAttribute('aria-expanded')==='true';document.querySelectorAll('.help-panel').forEach(p=>p.remove());document.querySelectorAll('button[data-help]').forEach(b=>b.setAttribute('aria-expanded','false'));if(!wasOpen){const panel=document.createElement('p');panel.className='help-panel';panel.textContent=btn.dataset.help;btn.closest('label,small').insertAdjacentElement('afterend',panel);btn.setAttribute('aria-expanded','true')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.help-panel').forEach(p=>p.remove());document.querySelectorAll('button[data-help]').forEach(b=>b.setAttribute('aria-expanded','false'))}});el('reset').onclick=()=>location.reload();el('reset').textContent='Reset to sample values';window.addEventListener('resize',compute);syncFee('pct');syncHorizon();syncAdvanced();compute();
