import "./index.css"


function Select({options,to,onset}:{ options:string[],to:string,onset:({types,payload}:{types:string,payload:string})=>void}) {

    function getOption(e:React.ChangeEvent<HTMLSelectElement>) {
        let opt= {
            types:e.target.id,
            payload:e.target.value
        }
        onset(opt)

    }

    

    return (
        < >
            <label htmlFor={to}>{to}</label>

            <select name={to} id={to} className="select" onChange={(e)=>{getOption(e)}}>
                {options.map((opt,index)=><option className="option"key={index} value={opt==="ALL"?"":opt}>{opt}</option>)}
             
            </select>

        </>
    );
}

export default Select;