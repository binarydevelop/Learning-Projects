var form= document.getElementById("Inputform");

form.addEventListener('submit',function(e){
    e.preventDefault();

    var search = document.getElementById('search').value;
    console.log(search);

    var originalName= search.split(' ').join(''); //To remove spaces

    fetch("https://api.github.com/users/"+ originalName)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      
      document.getElementById('result').innerHTML = ` 
                     <a target="_blank" href="https://www.github.com/${originalName}">  <img style="width="200px"; height="250px" " src="${data.avatar_url}" /> </a>
                      `    
      document.getElementById('otherinfo').innerHTML = `
                      <div id ="others" > Name : ${data.name} <br>
                      Repositories : ${data.public_repos} <br> Followers : ${data.followers} &nbsp &nbsp Following : ${data.following} <br> 
                                        Company : ${data.company}  <br>  Location : ${data.location} <br> 
                                        Id : ${data.id}   Twitter : ${data.twitter_username}    
                        
                      </div>
       `
                    })
      
})