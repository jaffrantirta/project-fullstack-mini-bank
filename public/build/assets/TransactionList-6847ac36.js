import{j as i,a,d as s}from"./app-75ecb23e.js";import{T as n,a as c,b as r,c as e,P as h}from"./Tr-483d6310.js";import{A as o}from"./index-968e51c1.js";import{h as m}from"./moment-fbc5633a.js";function T(t){return i("div",{className:"overflow-x-auto p-5 md:p-10",children:[i(n,{children:[a("thead",{children:i(c,{children:[a(r,{children:"No."}),a(r,{children:"Kode Ref."}),a(r,{children:"Tanggal"}),a(r,{children:"Nominal"}),a(r,{children:"Tipe"}),a(r,{children:"Aksi"})]})}),a("tbody",{children:t.transactions.data.length>0?t.transactions.data.map((d,l)=>i(c,{children:[a(e,{children:t.transactions.from+l}),a(e,{children:d.meta.code}),a(e,{children:m(d.meta.date).format("LL")}),i(e,{className:"text-right",children:["Rp.",d.amount]}),a(e,{children:d.type=="deposit"?"debit":"kredit"}),a(e,{className:"flex gap-3",children:a(s,{className:"hover:bg-gray-200 p-2 ",href:route("transaction.show",d.id),children:a(o,{className:"h-5"})})})]},l)):a(c,{children:a(e,{colSpan:6,className:"text-center",children:"Tidak ada data."})})})]}),a(h,{className:"mt-5",data:t.transactions})]})}export{T as default};