import React, { Component } from 'react';
import Header from './Header/Header';
import SignUp from './SignUp/SignUpComponent';
import SignIn from './SignIn/SignInComponent';
import UserProfile from './UserProfile/UserProfileComponent';
import AllInstitution from './Institution/AllInstitutionComponent';
import UserInstitutions from './UserInstitution/UserInstitutionsComponent';
import AddInstitution from './Institution/AddInstitutionComponent';
import InstitutionProfile from './Institution/InstitutionProfileComponent';
import TopUpBalance from './Wallet/TopUpBalanceComponent';
import PaymentHistory from './PaymentHistory/PaymentHistoryComponent';
import EmployeesOfTheInstitution from './UserInstitution/EmployeesOfTheInstitutionComponent';
import AddAnEmployee from './UserInstitution/AddAnEmployeeComponent';
import HomePage from './Home/HomePageComponent';
import MyChats from './Chat/MyChatsComponent';
import ChatCodeField from './Chat/ChatCodeFieldComponent';
import ChatPage from './Chat/Chat';


import { Switch, Route, Redirect } from 'react-router-dom';
class Main extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Switch>



                    {/* всі */}
                    <Route path="/signUp" component={SignUp}></Route>
                    <Route path="/signIn" component={SignIn}></Route>
                    <Route path="/allInstitution" component={AllInstitution}></Route>
                    <Route path="/homePage" component={HomePage}></Route>

                    {/* користувач */}
                    <Route path="/userProfile" component={UserProfile}></Route>
                    <Route path="/userInstitutions" component={UserInstitutions}></Route>
                    <Route path="/addInstitution" component={AddInstitution}></Route>
                    <Route path="/institutionProfile" component={InstitutionProfile}></Route>
                    <Route path="/myChats" component={MyChats}></Route>
                    <Route path="/chatCodeField" component={ChatCodeField}></Route>
                    <Route path="/chatPage" component={ChatPage}></Route>

                    {/* адміністратор */}
                    <Route path="/topUpBalance" component={TopUpBalance}></Route>
                    <Route path="/paymentHistory" component={PaymentHistory}></Route>
                    <Route path="/employeesOfTheInstitution" component={EmployeesOfTheInstitution}></Route>
                    <Route path="/addAnEmployee" component={AddAnEmployee}></Route>

                    <Redirect to="/homePage" component={HomePage}></Redirect>

                </Switch>
            </div>
        );
    }
}

export default Main