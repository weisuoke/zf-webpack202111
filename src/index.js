import isarray from 'isarray'
import "./index.css"
import "./less.less"
import "./sass.scss"

console.log(process.env.NODE_ENV)
console.log('isarray', isarray([1, 2, 3]))

fetch("/api/users").then(res => res.json()).then(data => console.log(data))