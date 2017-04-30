
import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";
import ClassNames from "classnames";
import BGImg from "../bg-img/";

import './_webgl.scss';



import '../../js/goo/lib/fsmpack.js';
import '../../js/goo/lib/quadpack.js';
import '../../js/goo/lib/timelinepack.js';
import '../../js/goo/lib/scriptpack.js';
import '../../js/goo/lib/passpack.js';
import '../../js/goo/lib/particlepack.js';
import '../../js/goo/lib/animationpack.js';
import '../../js/goo/lib/physicspack.js';


import '../../js/goo/CanvasWrapper.js';
import '../../js/goo/WebGLSupport.js';
import '../../js/goo/GSRVMock.js';





let gooRunner = null;



@observer
export default class Home extends Component {

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
                     let allEntities = gooRunner.world.getEntities();                  // all
                     let entity      = gooRunner.world.by.name('EntityName').first();  // by name
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
                    let world = gooRunner.world;
                    let renderer = gooRunner.renderer;

                    preventBrowserInconsistencies();
                    //addButtonListeners();

                    // Crazy hack to make orientation change work on the webview in iOS.
                    /*goo.SystemBus.addListener('goo.viewportResize', function () {
                        let dpx = gooRunner.renderer.devicePixelRatio;
                        renderer.domElement.style.width = '1px';
                        renderer.domElement.style.height = '1px';
                        renderer.domElement.offsetHeight;
                        renderer.domElement.style.width = '';
                        renderer.domElement.style.height = '';
                    });*/

                    // Load the scene
                    loadScene().then(function (loaderAndScene) {
                        let loader = loaderAndScene.loader;
                        let scene = loaderAndScene.scene;

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
                    let renderer = gooRunner.renderer;
                    let renderSystem = gooRunner.world.getSystem('RenderSystem');
                    let entities = renderSystem._activeEntities;
                    let lights = renderSystem.lights;

                    return renderer.precompileShaders(entities, lights).then(function () {
                        return renderer.preloadMaterials(entities);
                    })
                }

                /**
                 * Initializes the Goo Engine and all the systems.
                 */
                function initGoo() {
                    // Create typical Goo application.
                    let params = {"alpha": false, "useDevicePixelRatio": true, "manuallyStartGameLoop": true, "antialias": true, "logo": false};
                    gooRunner = new goo.GooRunner(params);

                    let stateMachineSystem = new goo.StateMachineSystem(gooRunner);
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
                    let loader = new goo.DynamicLoader({
                        world: gooRunner.world,
                        rootPath: 'res'
                    });

                    return loader.load('root.bundle').then(function(bundle) {
                        let scene = getFirstSceneFromBundle(bundle);
                        let alphaEnabled = false;

                        // Disable all the skyboxes if the background is transparent.
                        if (alphaEnabled) {
                            Object.keys(bundle)
                                .filter(function(k) { return /\.skybox$/.test(k); })
                                .forEach(function(k) {
                                    let v = bundle[k];
                                    v.box.enabled = false;
                                });
                        }

                        if (!scene || !scene.id) {
                            console.error('Error: No scene in bundle'); // Should never happen.
                            return null;
                        }

                        // Setup the canvas configuration (sizing mode, resolution, aspect
                        // ratio, etc).
                        let canvasConfig = scene ? scene.canvas : {};
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

                    for (let id in bundle) {
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
                    let loadedPercent = (100 * handled / total).toFixed();
                    document.getElementById('progress').innerHTML = loadedPercent + '<span>%</span>';

                    window.postMessage({handled: handled, total: total, loadedPercent: loadedPercent}, '*')
                }



                /**
                 * Prevent browser peculiarities from messing with our controls.
                 */
                function preventBrowserInconsistencies() {
                    document.body.addEventListener('touchstart', function (event) {
                        function isLink(el) { return el.nodeName === 'A'; }

                        if (isLink(event.target)) { return; }

                        let node = event.target.parentElement;
                        for (let i = 0; i < 5; i++) {
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
                    let errorObject = WebGLSupport.check();

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
                    let classList = document.getElementById(id).classList;
                    classList.add('visible');
                    classList.remove('hidden');
                }

                function hide(id) {
                    let classList = document.getElementById(id).classList;
                    classList.remove('visible');
                    window.setTimeout(function () {
                        classList.add('hidden');
                    }, 700);
                }

                //--------------------------------------------------------------------------

                init();
            })(CanvasWrapper, WebGLSupport);
    }

    componentWillUnmount(){
        if(!gooRunner) return;

        console.log('clear goo');
        gooRunner.renderer.clear();
        gooRunner.world.clear();
        gooRunner.clear();
    }
    


    render() {
        let {className} = this.props;

        className = ClassNames('Webgl', className);

        //console.log('webgl rendered');


        return (
            <div className={className}>


                {/* ----- LOADING ----- */}
                <div id="loading-screen" className="visible">
                    <BGImg className="loader" src="/resources/images/loader.svg"/>

                    <div id="cube">
                        <div className="front"/>
                        <div className="back"/>
                        <div className="right"/>
                        <div className="left"/>
                        <div className="top"/>
                        <div className="bottom"/>
                    </div>
                    <div id="progress">
                        5<span>%</span>
                    </div>
                </div>

                {/* ----- CANVAS ----- */}
                <div id="canvas-screen">
                    <div id="canvas-outer">
                        <div id="canvas-inner"/>
                    </div>
                </div>





                {/* ----- FALLBACK ----- */}
                <div id="fallback">
                    <h1>WebGL not supported or not enabled</h1>
                </div>
            </div>
        );
    }

}


