import{r as e,a as s}from"./app-75ecb23e.js";const m=e.forwardRef(function({type:f="text",isTextArea:c=!1,className:a="",isFocused:i=!1,...t},o){const r=o||e.useRef();return e.useEffect(()=>{i&&r.current.focus()},[]),c?s("textarea",{...t,className:"border-gray-300 focus:border-primary-primary shadow-sm "+a,ref:r}):s("div",{className:"flex flex-col items-start",children:s("input",{...t,type:f,className:"border-gray-300 focus:border-primary focus:ring-primary shadow-sm "+a,ref:r})})});export{m as T};