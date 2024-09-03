import{r as b,_ as P,j as a,a as e,n as D,d}from"./app-75ecb23e.js";import{M as I,S as j,D as A}from"./SecondaryButton-1a158e62.js";import{I as C}from"./InputError-06ff46e9.js";import{T as M,a as p,b as i,c as l,P as B}from"./Tr-483d6310.js";import{P as x}from"./PrimaryButton-f9cb5f16.js";import{T as w}from"./TextInput-35942232.js";import{A as E}from"./AuthenticatedLayout-5d652a0d.js";import{M as H,P as Y,a as q,T as F}from"./index-968e51c1.js";import"./transition-47a1610c.js";import"./ApplicationLogo-fff1849c.js";function V(r){const[m,h]=b.useState(!1),{data:u,setData:c,get:f,delete:N,errors:y,processing:k,reset:g,hasErrors:v}=P({id:"",search:"",message:""}),o=()=>{h(!1),g()},T=s=>{s.preventDefault(),N(route("account.destroy",u.id),{preserveScroll:!0,onSuccess:()=>o(),onFinish:()=>g()})},S=s=>{s.preventDefault();const t=u.search.trim();t?f(route("account.index",{q:t}),{preserveScroll:!0,onSuccess:n=>{c(n)}}):f(route("account.index"),{preserveScroll:!0,onSuccess:n=>{c(n)}})};return a(E,{auth:r.auth,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:m?"Hapus Akun Transaksi":"Akun Transaksi"}),session:r.session,children:[e(D,{title:"Akun Transaksi"}),a("div",{className:"grid grid-cols-1 md:grid-cols-2 p-10",children:[a("form",{onSubmit:S,className:"flex gap-3",children:[e(w,{id:"search",type:"search",placeholder:"Pencarian...",onChange:s=>c("search",s.target.value)}),a(x,{children:[e(H,{className:"h-5 mr-2"}),"Cari"]})]}),e("div",{className:"flex mt-5 md:mt-0 justify-center md:justify-end",children:e(d,{href:route("account.create"),children:a(x,{children:[e(Y,{className:"w-5 mr-3"})," Tambah"]})})})]}),a("div",{className:"overflow-x-auto p-5 md:p-10",children:[a(M,{children:[e("thead",{children:a(p,{children:[e(i,{children:"No."}),e(i,{children:"Kode"}),e(i,{children:"Nama"}),e(i,{children:"Aksi"})]})}),e("tbody",{children:r.accounts.data.map((s,t)=>a(p,{children:[e(l,{children:r.accounts.from+t}),e(l,{children:s.code}),e(l,{children:s.name}),a(l,{className:"flex gap-3",children:[e(d,{className:"hover:bg-gray-200 p-2 ",href:route("account.edit",s.id),children:e(q,{className:"h-5"})}),e(d,{className:"hover:bg-gray-200 p-2 ",onClick:n=>{n.preventDefault(),c("id",s.id),h(!0)},children:e(F,{className:"h-5 text-red-400"})})]})]},t))})]}),e(B,{className:"mt-5",data:r.accounts})]}),e(I,{show:m,onClose:o,children:a("form",{onSubmit:T,className:"p-6",children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Yakin hapus?"}),e("p",{className:"mt-1 text-sm text-gray-600",children:"Hanya akun transaksi yang tidak digunakan yang dapat dihapus."}),v&&e(C,{message:y.message}),a("div",{className:"mt-6 flex justify-end",children:[e(j,{onClick:o,children:"Batal"}),e(A,{className:"ml-3",disabled:k,children:"Ya, Hapus!"})]})]})})]})}export{V as default};