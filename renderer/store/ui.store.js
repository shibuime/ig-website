import {observable, computed, action} from 'mobx';



export default class UiStore {

    @observable layout = 'dock';

    //updateLayout
    @action updateLayout(layout) {
        this.layout = layout;
    }





}