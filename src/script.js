import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { MaxEquation } from 'three'

// Loading
const textureloader = new THREE.TextureLoader()
const normalTexture = textureloader.load('/textures/NormalMap.png')

// Debug
// this used to edit values of different things 
// rather than using hit& trial
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// creating a new sphere 
const geometry = new THREE.SphereBufferGeometry(.5, 64, 64);

// Materials
// meshstandardmaterial has a lot of options
// helps in showing the real world more properly 
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Adding another light
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(-1.63,0.04,-0.43)
pointLight2.intensity = 4
scene.add(pointLight2)
// const light1 = gui.addFolder('Light1')

// light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position, 'x').min(-6).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01) 

// pointlight helper helps you in having a ref point
// to see wht looks nice
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)
// after writing max nd min you can have a slider
// nd step is the increment  

// Light 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(1.6,-0.04,+0.43)
pointLight3.intensity = 4
scene.add(pointLight3)
// const light2 = gui.addFolder('Light2')

// light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'z').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position, 'x').min(-6).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01) 

// const light2Color ={
//     color: 0xff0000
// }
// light2.addColor(light2Color, 'color')
//       .onChange(()=> {
//           pointLight3.color.set(light2Color.color)
//       })
// const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, 3)
// scene.add(pointLightHelper3)

// now we're seeing the two lights gui is grouped maaking it a mess
// to solve tht we use groups

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
// changing the animatio based on mouse movement
document.addEventListener('mousemove', onDocumetMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0
const windowHalfX = window.innerWidth/ 2;
const windowHalfY = window.innerHeight/ 2;
function onDocumetMouseMove(event) {
    mouseX = (event.clientX- windowHalfX)
    mouseY = (event.clientY- windowHalfY) 
}
const updateSphere = (event) =>{
      sphere.position.y = window.scrollY * 0.001
}
window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()