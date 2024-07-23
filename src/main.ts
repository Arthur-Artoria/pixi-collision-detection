import { Collision } from './pixi/Collision'
import { PIXIApp } from './pixi/PIXIApp'
import './style.css'

PIXIApp.getInstance().init().then(() => new Collision().init())