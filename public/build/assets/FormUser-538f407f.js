import{_ as p,r as k,j as t,a as e}from"./app-75ecb23e.js";import{I as l}from"./InputError-06ff46e9.js";import{I as m}from"./InputLabel-4142342c.js";import{P as w}from"./PrimaryButton-f9cb5f16.js";import{T as o}from"./TextInput-35942232.js";import"./Select-03b6baaf.js";import{t as F}from"./transition-47a1610c.js";function B({className:N,...s}){var i,u,d,g,h,b;const{data:r,setData:n,errors:c,post:I,put:C,get:v,reset:_,processing:f,recentlySuccessful:x}=p({user_account_number:((i=s.user)==null?void 0:i.NIP)||((u=s.user)==null?void 0:u.NIS)||"",transaction_code:s.transaction_code||"",transaction_type:"",name:((d=s.user)==null?void 0:d.user.name)||"",email:((g=s.user)==null?void 0:g.user.email)||"",classroom:((b=(h=s.user)==null?void 0:h.classroom)==null?void 0:b.name)||"",balance:s.balance||""});console.log(s);const y=a=>{a.preventDefault(),v(route("transaction.show.user",r.user_account_number))};return k.useEffect(()=>{s.reset&&_()},[]),t("section",{className:N,children:[t("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Masukan No. Rekening"}),e("p",{className:"mt-1 text-sm text-gray-600"})]}),t("form",{onSubmit:y,className:"mt-6 space-y-6",children:[t("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-5",children:[t("div",{children:[e(m,{htmlFor:"transaction_code",value:"No. Transaksi"}),e(o,{id:"transaction_code",value:r.transaction_code,onChange:a=>n("transaction_code",a.target.value),type:"text",className:"mt-1 block w-full",disabled:!0}),e(l,{message:c.transaction_code,className:"mt-2"})]}),t("div",{children:[e(m,{htmlFor:"user_account_number",value:"No. Rekening"}),e(o,{id:"user_account_number",value:r.user_account_number,onChange:a=>n("user_account_number",a.target.value),type:"text",className:"mt-1 block w-full"}),e(l,{message:c.user_account_number,className:"mt-2"}),e(l,{message:s.isEmpty?"No. Rekening tidak ditemukan":"",className:"mt-2"})]}),t("div",{className:"flex items-center gap-4 mt-5",children:[e(w,{disabled:f,children:"Cari"}),e(F,{show:x,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:e("p",{className:"text-sm text-gray-600",children:"Tersimpan."})})]})]}),e("hr",{}),t("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-5",children:[t("div",{children:[e(m,{htmlFor:"name",value:"Nama"}),e(o,{id:"name",value:r.name,onChange:a=>n("name",a.target.value),type:"text",className:"mt-1 block w-full",disabled:!0}),e(l,{message:c.name,className:"mt-2"})]}),t("div",{children:[e(m,{htmlFor:"classroom",value:"Kelas"}),e(o,{id:"classroom",value:r.classroom,onChange:a=>n("classroom",a.target.value),type:"text",className:"mt-1 block w-full",disabled:!0}),e(l,{message:c.classroom,className:"mt-2"})]}),t("div",{children:[e(m,{htmlFor:"balance",value:"Saldo"}),e(o,{id:"balance",value:r.balance,onChange:a=>n("balance",a.target.value),type:"text",className:"mt-1 block w-full",disabled:!0}),e(l,{message:c.balance,className:"mt-2"})]})]})]})]})}export{B as default};