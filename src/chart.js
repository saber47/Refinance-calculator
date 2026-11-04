export function draw(basic,adjusted,months){
 const c=el('chart'),rect=c.getBoundingClientRect(),dpr=window.devicePixelRatio||1,w=Math.max(300,rect.width),h=260;c.width=w*dpr;c.height=h*dpr;
 const ctx=c.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
 const pad={l:64,r:15,t:18,b:35},lo=Math.min(0,...basic,...adjusted),hi=Math.max(0,...basic,...adjusted),range=hi-lo||1;
 const X=i=>pad.l+(w-pad.l-pad.r)*i/months,Y=v=>pad.t+(h-pad.t-pad.b)*(hi-v)/range;
 ctx.font='12px system-ui';ctx.strokeStyle='#dce3ed';ctx.fillStyle='#607084';
 for(let j=0;j<=4;j++){const v=lo+range*j/4,y=Y(v);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();ctx.fillText(Math.round(v/1000)+'k',8,y+4)}
 ctx.strokeStyle='#999';ctx.beginPath();ctx.moveTo(pad.l,Y(0));ctx.lineTo(w-pad.r,Y(0));ctx.stroke();
 for(const [vals,color] of [[basic,'#64748b'],[adjusted,'#2459b8']]){
  ctx.strokeStyle=color;ctx.lineWidth=2.5;ctx.beginPath();vals.forEach((v,i)=>i?ctx.lineTo(X(i),Y(v)):ctx.moveTo(X(i),Y(v)));ctx.stroke();
 }
 ctx.fillStyle='#607084';const step=Math.max(1,Math.ceil(months/12/8));for(let year=0;year<=months/12;year+=step)ctx.fillText(year+'y',X(year*12)-7,h-12);
}
