
import { IMainPanel } from "../interfaces/IMainPanel";
import { IDevicesDefinitions } from '../interfaces/IDevice';
import { StateQueue } from "../state/StateQueue";
import { StateCmdEnum } from "../state/StateCmdEnum";

export class LoginContent implements IMainPanel {

    constructor() {
    }

    public getDefinition(): IDevicesDefinitions {
        return {};
    }

    public update(data: any) {
        
    }

    public bind(){
        $("#login-button").click(() => {
            var user = $("input[name=email]").val();
            var pass = $("input[name=password]").val();
            StateQueue.enqueue(StateCmdEnum.Login, {user: user, pass: pass});
        });
    }

    public unbind() {

    }

    public render() {
        return `<div id='main-panel'>
        <div class="login-form-area mg-t-30 mg-b-40">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-4"></div>
                    <div class="col-lg-4">
                        <div class="login-bg">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="logo">
                                        <a href="#"><img class="logo" src="static/img/logo/logo.png" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="login-title">
                                        <h1>Login Form</h1>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="login-input-head">
                                        <p>E-mail</p>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="login-input-area">
                                        <input type="email" name="email" />
                                        <i class="fa fa-envelope login-user" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="login-input-head">
                                        <p>Password</p>
                                    </div>
                                </div>
                                <div class="col-lg-8">
                                    <div class="login-input-area">
                                        <input type="password" name="password" />
                                        <i class="fa fa-lock login-user"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">

                                </div>
                                <div class="col-lg-8">
                                    <div class="login-button-pro">
                                        <button id="login-button" class="login-button login-button-lg">Log in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4"></div>
                </div>
            </div>
        </div></div>`;
    }
}