import React,{useState,useEffect} from 'react'
import { BsEye ,BsEyeSlash } from "react-icons/bs";
import { useFormik } from 'formik';
import axios from 'axios'
const Signup=()=> {
  const [select,setSelect] = useState('')
  const [data,setData]= useState('')
  const [states,setStates]=useState('')
  const [showPass,setShowpass] = useState(false)
  const [city,setCity]=useState('')
  console.log(select);
  const handleSelect =(event)=>{
    // console.log(event.target.value); 
    setSelect(event.target.value)
  }
  const handleStates =(event)=>{
    // console.log(event.target.value); 
    setStates(event.target.value)
  }
  const handleCity=(event)=>{
    setCity(event.target.value)
  }
  const getData=()=>{
    fetch('./json/iranstates.json')
    .then(response=>response.json())
    .then(res=> setData(res))
  }
  // console.log(data);
  useEffect(()=>{ getData() },[])

  const handleShow = ()=>{
    setShowpass(!showPass)
  }
  const formik = useFormik({
    initialValues: {
     firstName:'',
     lastName:'',
     email: '',
     password:'',
     education:'',
     eduLocation:'',
     state:'',
     city:'',
    },
    validate:values => {
      const errors = {};
      if (!values.firstName){
        errors.firstName= "پر کردن این فیلد الزامی است.";
      }
      if (!values.lastName){
        errors.lastName= "پر کردن این فیلد الزامی است.";
      }
      if (!values.email) {
        errors.email = "پر کردن این فیلد الزامی است.";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "ایمیل نامعتبر است";
      }
      if (!values.password){
        errors.password= "پر کردن این فیلد الزامی است.";
      }
      else if (values.password.length < 6) {
        errors.password = "کلمه عبور کوتاه است.";
      }
      if (values.education && !values.eduLocation){
        errors.eduLocation= "پر کردن این فیلد الزامی است.";
      }
      if (!values.state){
        errors.state= "پر کردن این فیلد الزامی است.";
      }
      if (!values.city){
        errors.city= "پر کردن این فیلد الزامی است.";
      }
      return errors;
    },
    onSubmit:values => {
      console.log('submit')
      console.log(values);
      axios.post('http://localhost:3001/users',{'email':values.email,'password':values.password,"name":values.firstName})
      .then(resp => {console.log(resp.data);})
      .catch(error => {console.log(error)});
    alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="holder">
      <p className='text-light mt-3 fw-bold fs-4'>رایگان ثبت نام کنید</p>
      <form onSubmit={formik.handleSubmit}>
        <input className="password my-2 w-100" name="firstName" type="text" onChange={formik.handleChange} value={formik.values.firstName} placeholder="*نام"  />
        <p className="error">{formik.errors.firstName}</p>
        <input className="password my-2 w-100" name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName} placeholder="*نام خانوادگی" />
        <p className="error">{formik.errors.lastName}</p>
        <input className="password my-2 w-100" name="email" type="text" onChange={formik.handleChange} value={formik.values.email} placeholder="*پست الکترونیک"  />
        <p className="error">{formik.errors.email}</p>
        <div className='w-100 d-flex'>
          <input className="password my-2" id="pass" name="password" type={showPass?'text':'password'} onChange={formik.handleChange} value={formik.values.password} placeholder="* کلمه عبور"/>
          <button type="button" className=' btn-pass text-light py-0 my-2' onClick={handleShow}>{showPass?<BsEye/> :<BsEyeSlash/>}</button>
        </div>
          <select id="edu" className='text-light password w-100' name='education' defaultValue={select} onClick={handleSelect} onChange={formik.handleChange} value={formik.values.education}>
            <option value="" disabled >تحصیلات</option>
            <option value="diploma">دیپلم</option>
            <option value="bs">کارشناسی</option>
            <option value="ms">ارشد</option>
            <option value="phD">دکتری</option>
          </select>
            {select===''? "": 
            <input className='password my-3 w-100' name='eduLocation' type="text" onChange={formik.handleChange} value={formik.values.eduLocation} placeholder="*محل تحصیل"/>
          }
          <p className="error">{formik.errors.eduLocation}</p>
        
        <label className='text-light col-12 text-end'>محل تولد</label>
        <div>
          <select id="location" className='password form-select text-light' name='state' defaultValue={states} onClick={handleStates} onChange={formik.handleChange} value={formik.values.state} >
            <option value="" disabled >استان</option>
            {Object.keys(data).map((item,i)=><option key={i}>{item}</option>)}
          </select>
          <p className="error">{formik.errors.state}</p>
          <select id="location" className='password form-select text-light' name='city' defaultValue={city} onClick={handleCity} onChange={formik.handleChange} value={formik.values.city} >
            <option value="" disabled selected>شهر</option> 
            {data[states]?.map((item,i)=><option key={i}>{item}</option>)} 
          </select>
          <p className="error">{formik.errors.city}</p>
        </div>
        <button type="submit" className='bg-success btn-submit py-2 text-light fw-bold fs-5'>ثبت نام</button>
      </form>
     
    </div>   
  )
}
export default Signup