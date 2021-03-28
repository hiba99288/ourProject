import React from 'react'
function UpdateResult() {
    return ( 
    <div>
      <h2 className="name">رقم الهوية</h2><br></br>
      <input className="firstname" type="number"  /> 
      <h2 className="name">نتيجة الفحص</h2> <br></br> 
      <select className="option"   >
        <option disabled="disabled" selected="selected"  >اختر النتيجة</option>
        <option value="positive">ايجابي</option>
        <option value="negative">سلبي</option>
      </select><br></br>
      <button>تسجيل النتيجة </button>
      </div> )} 
      export default UpdateResult
