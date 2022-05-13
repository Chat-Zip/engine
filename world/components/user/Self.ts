import { PerspectiveCamera } from "three";
import { UserData } from "./User";
import Peer, { Peers } from "../../../connection/Peer";
import World from "../../index";
import Collider from "../../physics/Collider";
import Gravity from "../../physics/Gravity";

const user = navigator.userAgent;
const isMobile = user.indexOf('iPhone') > -1 || user.indexOf('Android') > -1 || user.indexOf('iPad') > -1 || user.indexOf('iPod') > -1;

export interface SelfState {
    pos: Array<number>;
    velocity: Array<number>;
    onGround: boolean;
    speed: number;
    jumpHeight: number;
    gravity: number;
    gravAccel: number;
}

export interface CollisionRange {
    width: number;
    height: number;
    depth: number;
}

export interface SelfInterface {
    data: UserData;
    state: SelfState;
    peers: Peers;
    collision: CollisionRange;
    camera: PerspectiveCamera;
    collider: Collider;
    gravity: Gravity;
}

export default class Self implements SelfInterface {
    data: UserData;
    state: SelfState;
    peers: Peers;
    collision: CollisionRange;
    camera: PerspectiveCamera;
    collider: Collider;
    gravity: Gravity;

    constructor(world: World, id: string, name: string) {
        this.data = {
            userId: id,
            name: name,
        };
        this.state = {
            pos: [0, 0, 0],
            velocity: [0, 0, 0],
            onGround: false,
            speed: 25,
            jumpHeight: 60,
            gravity: 200,
            gravAccel: 0,
        };
        this.collision = {
            width: 4,
            height: 14,
            depth: 4,
        };
        this.peers = new Map<string, Peer>();
        this.camera = new PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 256);
        this.collider = new Collider(this, world.map);
        this.gravity = new Gravity(this.state);
    }
}
