
import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {Link} from 'react-router';
import {observer} from "mobx-react";
import ClassNames from "classnames";
import autobind from "autobind-decorator";
import WheelIndicator from "wheel-indicator";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import './_style.scss';


const lastSlide = 7;
const lastCameraPos = 4;

let gooRunner = null;


@observer
export default class Home extends Component {

    @observable state = {
        slideNum: 0
    };


    componentDidMount(){
            (function (
                CanvasWrapper,
                WebGLSupport
            ) {
                'use strict';


                function setup(scene, loader) {
                    // Application code goes here!

                    /*
                     To get a hold of entities, one can use the World's selection functions:
                     var allEntities = gooRunner.world.getEntities();                  // all
                     var entity      = gooRunner.world.by.name('EntityName').first();  // by name
                     */
                }

                /**
                 * Entry point. Gets called after the script is loaded and displays the
                 * fallback if no WebGL is found, adds event listeners and starts loading
                 * the scene into the engine.
                 *
                 * @return {Promise}
                 */
                function init() {
                    if (!checkForWebGLSupport()) { return; }

                    // Init the GooEngine
                    initGoo();
                    var world = gooRunner.world;
                    var renderer = gooRunner.renderer;

                    preventBrowserInconsistencies();
                    //addButtonListeners();

                    // Crazy hack to make orientation change work on the webview in iOS.
                    /*goo.SystemBus.addListener('goo.viewportResize', function () {
                        var dpx = gooRunner.renderer.devicePixelRatio;
                        renderer.domElement.style.width = '1px';
                        renderer.domElement.style.height = '1px';
                        renderer.domElement.offsetHeight;
                        renderer.domElement.style.width = '';
                        renderer.domElement.style.height = '';
                    });*/

                    // Load the scene
                    loadScene().then(function (loaderAndScene) {
                        var loader = loaderAndScene.loader;
                        var scene = loaderAndScene.scene;

                        world.process();

                        if (goo.Renderer.mainCamera) {
                            renderer.checkResize(goo.Renderer.mainCamera);
                        }

                        return setup(scene, loader);
                    }).then(function () {
                        (new goo.EntityCombiner(world)).combine();
                        world.process();
                        return prepareMaterials();
                    }).then(function () {
                        show('canvas-screen');
                        hide('loading-screen');
                        document.querySelector('.Home').classList.add('ready');
                        CanvasWrapper.show();
                        CanvasWrapper.resize();

                        gooRunner.startGameLoop();

                        renderer.domElement.focus();

                    }).then(null, function (error) {
                        // If something goes wrong, 'error' is the error message from the engine.
                        console.error(error);
                    });
                }

                /**
                 * Preloads the shaders used by the materials in the scene and then preloads
                 * those materials.
                 *
                 * @return {Promise}
                 */
                function prepareMaterials() {
                    var renderer = gooRunner.renderer;
                    var renderSystem = gooRunner.world.getSystem('RenderSystem');
                    var entities = renderSystem._activeEntities;
                    var lights = renderSystem.lights;

                    return renderer.precompileShaders(entities, lights).then(function () {
                        return renderer.preloadMaterials(entities);
                    })
                }

                /**
                 * Initializes the Goo Engine and all the systems.
                 */
                function initGoo() {
                    // Create typical Goo application.
                    var params = {"alpha": false, "useDevicePixelRatio": true, "manuallyStartGameLoop": true, "antialias": true, "logo": false};
                    gooRunner = new goo.GooRunner(params);

                    var stateMachineSystem = new goo.StateMachineSystem(gooRunner);
                    gooRunner.world
                        .add(new goo.AnimationSystem())
                        .add(stateMachineSystem)
                        .add(new goo.HtmlSystem(gooRunner.renderer))
                        .add(new goo.Dom3dSystem(gooRunner.renderer))
                        .add(new goo.TimelineSystem())
                        .add(new goo.PhysicsSystem())
                        .add(new goo.ColliderSystem())
                        .add(new goo.ParticleSystemSystem());

                    stateMachineSystem.play();
                }

                /**
                 * Loads the scene.
                 *
                 * @return {Promise}
                 *         A promise which is resolved when the scene has finished loading.
                 */
                function loadScene() {
                    // The dynamic loader takes care of loading the data.
                    var loader = new goo.DynamicLoader({
                        world: gooRunner.world,
                        rootPath: 'res'
                    });

                    return loader.load('root.bundle').then(function(bundle) {
                        var scene = getFirstSceneFromBundle(bundle);
                        var alphaEnabled = false;

                        // Disable all the skyboxes if the background is transparent.
                        if (alphaEnabled) {
                            Object.keys(bundle)
                                .filter(function(k) { return /\.skybox$/.test(k); })
                                .forEach(function(k) {
                                    var v = bundle[k];
                                    v.box.enabled = false;
                                });
                        }

                        if (!scene || !scene.id) {
                            console.error('Error: No scene in bundle'); // Should never happen.
                            return null;
                        }

                        // Setup the canvas configuration (sizing mode, resolution, aspect
                        // ratio, etc).
                        var canvasConfig = scene ? scene.canvas : {};
                        CanvasWrapper.setup(gooRunner.renderer.domElement, canvasConfig);
                        CanvasWrapper.add();
                        CanvasWrapper.hide();

                        return loader.load(scene.id, {
                            preloadBinaries: true,
                            progressCallback: onLoadProgress
                        })
                            .then(function (scene) {
                                return { scene: scene, loader: loader };
                            });
                    });
                }

                /**
                 * Gets the first scene from the specified bundle.
                 *
                 * @param {object} bundle
                 *        Bundle containing all the entities and assets in the scene.
                 *
                 * @return {object}
                 *         The configuration object of the first scene that was found in
                 *         the bundle.
                 */
                function getFirstSceneFromBundle(bundle) {
                    function isSceneId(id) { return /\.scene$/.test(id); }

                    for (var id in bundle) {
                        if (isSceneId(id)) {
                            return bundle[id];
                        }
                    }

                    return null;
                }

                /**
                 * Callback for the loading screen.
                 *
                 * @param  {number} handled
                 * @param  {number} total
                 */
                function onLoadProgress(handled, total) {
                    var loadedPercent = (100 * handled / total).toFixed();
                    document.querySelector('#progress').style.transform = 'scale(1, '+ (loadedPercent * .01) +')';
                    document.querySelector('#loading-screen i').innerHTML = loadedPercent + '<span>%</span>';

                    window.postMessage({handled: handled, total: total, loadedPercent: loadedPercent}, '*')
                }



                /**
                 * Prevent browser peculiarities from messing with our controls.
                 */
                function preventBrowserInconsistencies() {
                    document.body.addEventListener('touchstart', function (event) {
                        function isLink(el) { return el.nodeName === 'A'; }

                        if (isLink(event.target)) { return; }

                        var node = event.target.parentElement;
                        for (var i = 0; i < 5; i++) {
                            if (!node) { break; }
                            if (isLink(node)) { return; }
                            node = node.parentElement;
                        }

                        event.preventDefault();
                    }, false);
                }

                /**
                 * Checks if WebGL is supported by the current browser and, if not, shows
                 * the fallback.
                 */
                function checkForWebGLSupport() {
                    var errorObject = WebGLSupport.check();

                    if (errorObject.error === WebGLSupport.ERRORS.NO_ERROR) {
                        show('loading-screen');
                        return true;
                    } else {
                        show('fallback');
                        hide('loading-screen');
                        return false;
                    }
                }

                /**
                 * Converts camelCase (js) to dash-case (html)
                 */
                function camel2dash(str) {
                    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                }

                function show(id) {
                    var classList = document.getElementById(id).classList;
                    classList.add('visible');
                    classList.remove('hidden');
                }

                function hide(id) {
                    var classList = document.getElementById(id).classList;
                    classList.remove('visible');
                    window.setTimeout(function () {
                        classList.add('hidden');
                    }, 1000);
                }

                //--------------------------------------------------------------------------

                init();
            })(CanvasWrapper, WebGLSupport);



            this.initWheel();

    }

    componentWillUnmount(){
        if(!gooRunner) return;

        console.log('clear goo');
        gooRunner.renderer.clear();
        gooRunner.world.clear();
        gooRunner.clear();
    }



    @autobind
    goToScreen(num){
        this.state.slideNum = num;


        if(num > 0 && num < lastCameraPos){
            goo.SystemBus.emit('showNumbers')
        }
        else{
            goo.SystemBus.emit('hideNumbers')
        }

        if(num === 0 || num > lastCameraPos) return;
        goo.SystemBus.emit('setCameraPosition'+(num-1));


    }

    @autobind
    initWheel() {

        let indicator = new WheelIndicator({
            elem: document.querySelector('#wrapper'),
            callback: function(e){
                this.wheelHandler(e.direction)

            }.bind(this)
        });
    }

    @autobind
    wheelHandler(dir) {
        let {slideNum} = this.state;

        if(dir === "up" && slideNum > 0){
            console.log("up");
            this.goToScreen(slideNum-1);
        }
        if(dir === "down" && slideNum < lastSlide){
            console.log("down");
            this.goToScreen(slideNum+1);
        }
    }


    render() {
        let {slideNum} = this.state;
        let {className} = this.props;

        className = ClassNames('Home', className);

        return (
            <div className={className}>

                <div id="wrapper" className={'slide-'+slideNum}>


                    <div id="loading-screen" className="visible">
                        <div id="progress"/>
                        <i/>
                        <h5>
                            Loading experience data...
                        </h5>
                    </div>


                    <div id="canvas-screen">
                        <div id="canvas-outer">
                            <div id="canvas-inner"/>
                        </div>
                    </div>



                    <div id="hero" className={slideNum > 0 ? 'fold' : ''}/>



                    <ReactCSSTransitionGroup
                        transitionName="FadeAnimation"
                        transitionLeaveTimeout={500}>
                        {(slideNum >= 0 && slideNum < 4) &&
                            <div className="Home-title">
                                <h1>
                                    <span data-attr="Intelligo"/>
                                    <span data-attr="Group"/>
                                </h1>
                                <h2>
                                    <span data-attr="Innovative"/>
                                    <span data-attr="intelligence,"/>
                                    <span data-attr="iactionable"/>
                                    <span data-attr="insights"/>
                                </h2>

                                <div className="Button scroll" onClick={()=> this.goToScreen(4)}>
                                    <span className="label">Our Technology</span>



                                    <svg width="40px" height="40px" viewBox="211 14 40 40">
                                        <circle  stroke="#FFFFFF" strokeWidth="1" fill="none" cx="231" cy="34" r="13"/>
                                        <g>
                                            <path d="M224.733438,37.8612881 L237.561483,37.8612881" id="Path-13" stroke="#FFFFFF" strokeWidth="1" fill="none" transform="translate(231.147461, 37.861288) rotate(-270.000000) translate(-231.147461, -37.861288) "/>
                                            <polyline id="Path-14" stroke="#FFFFFF" strokeWidth="1" fill="none" transform="translate(231.105673, 42.246975) rotate(-270.000000) translate(-231.105673, -42.246975) " points="229.008425 37.823351 233.355673 42.1705988 228.855673 46.6705988"/>
                                        </g>
                                    </svg>
                                </div>


                                <svg width="26px" height="151px" viewBox="124 636 26 151" onClick={()=> this.goToScreen(1)}>
                                    <polyline id="Path-2" stroke="#FFFFFF" strokeWidth="6" fill="none" points="128 640 128 777.990948 146.064685 759.926262"/>
                                </svg>
                            </div>
                        }
                    </ReactCSSTransitionGroup>



                    <ReactCSSTransitionGroup
                        transitionName="FromBottomAnimation"
                        transitionLeaveTimeout={500}>

                        {(slideNum >= 4 && slideNum < 7) &&
                        <div className="section-title l">
                            <section>
                                <h2>
                                    Intelligo Clarity
                                </h2>
                                <h3>
                                    Technology that monitors human risk
                                </h3>
                                <p>
                                    The first truly automated due diligence solution, producing a breathtakingly comprehensive report in minutes.
                                </p>

                                <Link className="Button white" to="/about">
                                    <span className="label">More about Clarity</span>
                                    <svg width="50px" height="45px" viewBox="2 5 50 45">
                                        <path d="M30,42.2132034 C38.2842712,42.2132034 45,35.4974747 45,27.2132034 C45,18.9289322 38.2842712,12.2132034 30,12.2132034 C21.7157288,12.2132034 15,18.9289322 15,27.2132034" stroke="#FFFFFF" strokeWidth="1" fill="none" transform="translate(30.000000, 27.213203) rotate(-315.000000) translate(-30.000000, -27.213203) "/>
                                        <path d="M3.44726562,27.0657425 L33.2753106,27.0657425" id="Path-13" stroke="#FFFFFF" stroke-width="1" fill="none"/>
                                        <polyline  stroke="#FFFFFF" strokeWidth="1" fill="none" points="28.1497271 21.6839066 33.4969749 27.0311544 27.9969749 32.5311544"/>
                                    </svg>
                                </Link>
                            </section>
                        </div>
                        }

                    </ReactCSSTransitionGroup>



                    <ReactCSSTransitionGroup
                        transitionName="FromBottomAnimation"
                        transitionLeaveTimeout={500}>
                        {(slideNum === lastSlide) &&
                        <div className="section-title r">
                            <section>
                                <h2>
                                    Services
                                </h2>
                                <p>
                                    Utilizing the experience of Israeli intelligence coupled with innovative technology, enables us to deliver comprehensive background checks and profiling to our clients around the world.
                                </p>
                            </section>
                        </div>
                        }
                    </ReactCSSTransitionGroup>





                    <ul className="bullets">

                        <li className={(slideNum >= 0 && slideNum < 4) ? "active" : ""} onClick={()=> this.goToScreen(0)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: Math.max(71 - slideNum*23, 0)}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                        <li className={(slideNum >= 4 && slideNum < 7) ? "active" : ""} onClick={()=> this.goToScreen(4)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: Math.min(71, Math.max(71 - (slideNum-3)*23, 0))}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                        <li className={slideNum === lastSlide ? "active" : ""} onClick={()=> this.goToScreen(lastSlide)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: 0}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                    </ul>






                    <div id="fallback">
                        <h1>WebGL not supported or not enabled</h1>
                    </div>

                </div>




            </div>
        );
    }

}


