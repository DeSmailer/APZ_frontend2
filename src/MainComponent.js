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

                    {/* <Route path="/signUp" component={SignUp}></Route>
                    <Route path="/signIn" component={LogIn}></Route>

                    <Route path="/ClosedWaterSupplyInstallationListByOrganizationId" component={ClosedWaterSupplyInstallationListByOrganizationId}></Route>
                    <Route path="/AddClosedWaterSupplyInstallation" component={AddClosedWaterSupplyInstallation}></Route>
                    <Route path="/EditClosedWaterSupplyInstallation/:closedWaterSupplyInstallationId" component={EditClosedWaterSupplyInstallation}></Route>

                    <Route path="/poolListByCWIId/:closedWaterSupplyInstallationId" component={PoolListByCWIId}></Route>
                    <Route path="/PoolListByOrganizationId" component={PoolListByOrganizationId}></Route>
                    <Route path="/AddPoolByCWIId/:closedWaterSupplyInstallationId" component={AddPoolByCWIId}></Route>
                    <Route path="/EditPoolByCWIId/:poolId" component={EditPoolByCWIId}></Route>
                    
                    <Route path="/FishListByPoolId/:poolId" component={FishListByPoolId}></Route>
                    <Route path="/FishListForRelocationByPoolId/:poolId" component={FishListForRelocationByPoolId}></Route>
                    <Route path="/fishEditForm/:FishId" component={FishEditForm}></Route>
                    <Route path="/FishEdit/:FishId" component={FishEdit}></Route>
                    <Route path="/AddFishComponent/:poolId" component={AddFishComponent}></Route>
                    
                    <Route path="/HerdListByPoolId/:poolId" component={HerdListByPoolId}></Route>
                    
                    <Route path="/KindOfFishList" component={KindOfFishList}></Route>
                    <Route path="/AddKindOfFish" component={AddKindOfFish}></Route>
                    <Route path="/EditKindOfFish/:kindOfFishId" component={EditKindOfFish}></Route>
                     
                    <Route path="/MilkinhListByFishId/:fishId" component={MilkinhListByFishId}></Route>

                    <Route path="/PregancyListByFishId/:fishId" component={PregancyListByFishId}></Route>

                    <Route path="/ExpectedWeightOfFishInThePoolByCWIId/:closedWaterSupplyInstallationId" component={ExpectedWeightOfFishInThePoolByCWIId}></Route>
                    

                    {/* админ 

                    <Route path="/OrganizationListAdmin" component={OrganizationListAdmin}></Route>
                    <Route path="/AddOrganizationAdmin" component={AddOrganizationAdmin}></Route>
                    <Route path="/EditOrganizationAdmin/:organizationId" component={EditOrganizationAdmin}></Route>
                    
                    <Route path="/ClosedWaterSupplyInstallationListAdmin" component={ClosedWaterSupplyInstallationListAdmin}></Route>
                    <Route path="/AddClosedWaterSupplyInstallationAdmin/:organizationId" component={AddClosedWaterSupplyInstallationAdmin}></Route>
                    <Route path="/EditClosedWaterSupplyInstallationAdmin/:closedWaterSupplyInstallationId" component={EditClosedWaterSupplyInstallationAdmin}></Route>
                    
                    <Route path="/PoolListAdmin" component={PoolListAdmin}></Route>

                    <Route path="/FishListAdmin" component={FishListAdmin}></Route>

                    <Route path="/HerdListAdmin" component={HerdListAdmin}></Route>
                    <Route path="/AddHerdAdminComponent/:poolId" component={AddHerdAdminComponent}></Route>
                    <Route path="/EditHerdAdmin/:herdId" component={EditHerdAdmin}></Route>
                    
                    <Route path="/MilkingListAdmin" component={MilkingListAdmin}></Route>
                    <Route path="/AddMilkingAdmin/:fishId" component={AddMilkingAdmin}></Route>
                    <Route path="/EditMilkingAdminComponent/:milkingId" component={EditMilkingAdminComponent}></Route>

                    <Route path="/PregancyListAdmin" component={PregancyListAdmin}></Route>
                    <Route path="/AddPregancyAdmin/:fishId" component={AddPregancyAdmin}></Route>
                    <Route path="/EditPregnancyAdmin/:pregnancyId" component={EditPregnancyAdmin }></Route>
                    
                    <Route path="/StateOfTheSystemListAdmin" component={StateOfTheSystemListAdmin}></Route>
                    <Route path="/EditStateOfTheSystemAdmin/:stateOfTheSystemId" component={EditStateOfTheSystemAdmin}></Route>

                    {/* MOTI 
                    <Route path="/MOTI_Lab4" component={MOTI_Lab4}></Route>

                    <Redirect to="/signIn" component={LogIn}></Redirect>*/}

                    <Redirect to="/homePage" component={HomePage}></Redirect>

                </Switch>
            </div>
        );
    }
}

export default Main