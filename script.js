
document.addEventListener('DOMContentLoaded',()=>{
 const ids=['selling','product','ads','delivery','shipping','overhead','fee','tax','orders'];
 const el=id=>document.getElementById(id);
 if(!el('selling')) return;
 const money=n=>'PKR '+Math.round(n).toLocaleString('en-PK');
 function calc(){
  const v={};ids.forEach(id=>v[id]=Math.max(0,Number(el(id).value)||0));
  const rate=Math.min(100,Math.max(1,v.delivery))/100;
  const deliveredProduct=v.product;
  const adPerDelivered=v.ads/rate;
  const shipPerDelivered=v.shipping/rate;
  const overheadPerDelivered=v.overhead/rate;
  const taxCost=v.selling*v.tax/100;
  const total=deliveredProduct+adPerDelivered+shipPerDelivered+overheadPerDelivered+v.fee+taxCost;
  const profit=v.selling-total;
  const margin=v.selling?profit/v.selling*100:0;
  const breakEven=Math.max(0,(v.selling-deliveredProduct-shipPerDelivered-overheadPerDelivered-v.fee-taxCost)*rate);
  const roas=breakEven>0?v.selling/breakEven:0;
  const monthly=profit*v.orders;
  el('profit').textContent=money(profit);
  el('margin').textContent=margin.toFixed(1)+'%';
  el('breakEven').textContent=money(breakEven);
  el('roas').textContent=roas.toFixed(2)+'x';
  el('monthly').textContent=money(monthly);
  el('totalcost').textContent=money(total);
  el('warning').textContent=profit<0?'Your current inputs show a loss per delivered order. Review product cost, advertising and delivery rate.':'Estimate only: validate the assumptions with actual order and courier data before increasing ad spend.';
 }
 ids.forEach(id=>el(id).addEventListener('input',calc));calc();
});
