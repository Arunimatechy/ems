









    




let form=document.getElementById('form')
let fullname=document.getElementById('fullname')
let Enterjob=document.getElementById('Enterjob')
let entersalary=document.getElementById('entersalary')
let table=document.getElementById('table')
let search=document.getElementById('search')

let editmode=false;
let editindex=-1;

let employees = JSON.parse(localStorage.getItem('employees')) || []
let filteremployees = [...employees]
let job=document.getElementById('jobcateogry')


function add(e){
    e.preventDefault()
    if(fullname.value=='' || Enterjob.value=='' || entersalary.value==''){
        return alert("Please fill all fields")
    }

    if(editmode){
        let emp = employees.find(x => x.id === editindex)
        emp.fullname = fullname.value
        emp.job = Enterjob.value
        emp.salary = entersalary.value
        editmode = false
        editindex = -1
    } else {
        let newemployee = {
            id: Date.now(),
            fullname: fullname.value,
            job: Enterjob.value,
            salary: entersalary.value
        }
        employees.push(newemployee)
    }

    updatestorage()
    clearinput()
    render()
}

function selectcateogry(){

    if(jobcateogry.value=='All'){
        filteremployees=[...employees]
        render()
        return
    }
    filteremployees=employees.filter((x)=>{
        return x.job.toLowerCase()==jobcateogry.value
    })
render()
}

function searchemployee(){
    filteremployees = employees.filter((emp) =>{ return emp.fullname.toLowerCase().includes(search.value.toLowerCase()) ||
        emp.job.toLowerCase().includes(search.value.toLowerCase()) ||
        emp.salary .toLowerCase().includes(search.value.toLowerCase())
    }
    )
    render()
}


function render(){
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Salary</th>
            <th>Actions</th>
        </tr>
    `
    filteremployees.forEach((emp)=>{
        table.innerHTML += `
            <tr>
                <td>${emp.fullname}</td>
                <td>${emp.job}</td>
                <td>${emp.salary}</td>
                <td>
                    <button class="editbtn" onclick="setEdit(${emp.id})">${editindex == emp.id ? 'Cancel' : 'Edit'}</button>
                    <button class="deletebtn" onclick="deleteemployee(${emp.id})">Delete</button>
                </td>
            </tr>
        `
    })
}



function setEdit(id){
    if(editmode){
        return cancel()
    }
    editmode = true;
    editindex = id;

    let emp = employees.find(x => x.id === id)
    if(emp){
        fullname.value = emp.fullname
        Enterjob.value = emp.job
        entersalary.value = emp.salary
    }
    render()
}



function cancel(id){
    editmode = false;
    editindex = -1;
    clearinput()
    render()
}



function deleteemployee(id){
    let sure = confirm("Are you sure you want to delete?")
    if(!sure){
        return
    }
     let emp = employees.find(x => x.id == id)
     let index = employees.indexOf(emp)
    employees.splice(index,1)

    updatestorage()
  
    render()
}



function updatestorage(){
    localStorage.setItem('employees', JSON.stringify(employees))
    filteremployees = [...employees]
}



function clearinput(){
    fullname.value = ''
    Enterjob.value = ''
    entersalary.value = ''
}



search.addEventListener('input', ()=>{searchemployee()})
jobcateogry.addEventListener('change', ()=>{selectcateogry()})
form.addEventListener('submit', add)

render()