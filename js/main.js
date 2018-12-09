fetch('https://superdonor.herokuapp.com/api/events')
.then(res=>res.json())
.then(data=>console.log(data))