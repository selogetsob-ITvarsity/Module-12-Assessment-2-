

let rootPath = "https://mysite.itvarsity.org/api/ContactBook/";
let apiKey = checkApiKey();

function checkApiKey()
{
    if(!localStorage.getItem("apiKey")){
        window.open("enter-api-key.html","_self");
    }
    return localStorage.getItem("apiKey");
}

/******************************************Add Form***********************************************************/


            document.getElementById("submitFormAdd").addEventListener('click',submitFormAdd);
            document.getElementById("homeLink").addEventListener('click',homeLink)
            var id = getId();
            
            document.getElementById("submitFormEdit").addEventListener('click', submitFormEdit);
            document.getElementById("editContact").addEventListener('click', editContact);
            document.getElementById("deleteContact").addEventListener('click', deleteContact);
            
        
            function submitFormAdd(e)
            {
                e.preventDefault();
                
                const form = new FormData(document.querySelector('#editForm'));
                form.append('apiKey', apiKey);
                
                fetch(rootPath + 'controller/insert-contact/', {
                    method : 'POST',
                    headers: {'Accept': 'application/json, *.*'},
                    body: form
                })
                .then(function(response){
                    return response.text();
                })
                .then(function(data){
                    if(data == "1")
                        {
                            alert("contact added");
                            homeLink();
                        } else {
                            alert(data);
                            homeLink();
                        }
                })
            }
            
            function homeLink(){
                window.open("index.html","_self");
            }


/*************************************** Edit Contact ***********************************************************/
            



   var id = getId();
            document.getElementById("homeLink").addEventListener('click', homeLink);
            document.getElementById("submitFormEdit").addEventListener('click', submitFormEdit);
            document.getElementById("editContact").addEventListener('click', editContact);
            document.getElementById("deleteContact").addEventListener('click', deleteContact);
           
            
            function getId()
            {
                var url = window.location.href;
                var pos = url.search("=");
                var id = url.slice(pos + 1);
                return id;
            }
            
            function getContact()
            {
                fetch(rootPath + 'controller/get-contacts/?id=' + id)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    displayOutput(data);
                    
                })
            }
            
            function homeLink()
            {
                window.open("index.html", "_self");
            }
            
            function displayOutput(data){
                
                avatarImg =    ` 
                                    <img src="${rootPath}/controller/uploads/${data[0].avatar}" width ="200"/>
                                `;
                document.getElementById("avatarImage").innerHTML = avatarImg;
                document.getElementById("firstname").value = data[0].firstname;
                document.getElementById("lastname").value = data[0].lastname;
                document.getElementById("mobile").value = data[0].mobile;
                document.getElementById("email").value = data[0].email;
            }
            
            
            
            function editContact()
            {
                document.getElementById("firstname").readOnly = false;
                document.getElementById("lastname").readOnly = false;
                document.getElementById("mobile").readOnly = false;
                document.getElementById("email").readOnly = false;
                
                document.getElementById("avatar").hidden = false;
                document.getElementById("submitFormEdit").hidden = false;
            }
            
            
            function submitFormEdit(e){
                e.preventDefault();
                
                const form = new FormData(document.querySelector("#editForm"));
                form.append('apiKey', apiKey);
                form.append('id', id);
                
                fetch(rootPath + 'controller/edit-contact/', {
                    method : 'POST',
                    headers: {'Accept': 'application/json, *.*'},
                    body: form
                })
                .then(function(response){
                    return response.text();
                })
                .then(function(data){
                    if(data == "1")
                        {
                            alert("contact edited");
                            homeLink();
                        } else {
                            alert(data);
                            homeLink();
                        }
                })
            }
            
            function deleteContact()
            {
                var confirmDelete = confirm("Delete contact. Are you sure?");
                
                if(confirmDelete == true){
                    fetch(rootPath + 'controller/delete-contact/?id=' + id)
                    .then(function(response){
                        return response.text();
                    })
                    .then(function(data){
                        if(data == "1"){
                            homeLink();
                        }else {
                            alert(data);
                        }
                    })
                }
            }