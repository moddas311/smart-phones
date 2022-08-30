/* fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.jason())
.then(data => console.log(data))
.catch(error => console.log(error));

try{
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    console.log(data);
}

// it will be not work without async
catch{

}

// document.getElementById('abc');

// synchronous asynchronous

console.log(1);

setTimeout(() => {
    console.log(2);
}, 3000);
console.log(3);
console.log(14);
console.log(15);
console.log(16); */