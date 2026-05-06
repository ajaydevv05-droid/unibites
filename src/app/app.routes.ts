import { Routes } from '@angular/router';
import { Guestmaster } from './Guest/guestmaster/guestmaster';
import { Guesthome } from './Guest/guesthome/guesthome';
import { Login } from './Guest/login/login';
import { Adminmaster } from './Admin/adminmaster/adminmaster';
import { Adminhome } from './Admin/adminhome/adminhome';
import { Categoryregistration } from './Admin/categoryregistration/categoryregistration';
import { Categoryview } from './Admin/categoryview/categoryview';
import { Categoryedit } from './Admin/categoryedit/categoryedit';
import { Staffregistration } from './Admin/staffregistration/staffregistration';
import { Staffview } from './Admin/staffview/staffview';
import { Staffedit } from './Admin/staffedit/staffedit';
import { Foodregistration } from './Admin/foodregistration/foodregistration';
import { Foodview } from './Admin/foodview/foodview';
import { Studentmaster } from './Student/studentmaster/studentmaster';
import { Studenthome } from './Student/studenthome/studenthome';
import { Studentregistration } from './Guest/studentregistration/studentregistration';
import { Staffmaster } from './Staff/staffmaster/staffmaster';
import { Staffhome } from './Staff/staffhome/staffhome';
import { Categorydetails } from './Student/categorydetails/categorydetails';
import { Singleview } from './Student/singleview/singleview';
import { Foodsingle } from './Student/foodsingle/foodsingle';
import { Cartview } from './Student/cartview/cartview';
import { Payment } from './payment/payment';
import { About } from './about/about';
import { Orderview } from './Student/orderview/orderview';
import { Studentmaster1 } from './Student/studentmaster1/studentmaster1';
import { Cartdetails } from './Staff/cartdetails/cartdetails';
import { Orderdetails } from './Staff/orderdetails/orderdetails';
import { Singlefood } from './Staff/singlefood/singlefood';
import { Staffpayment } from './Staff/staffpayment/staffpayment';
import { Viewsingle } from './Staff/viewsingle/viewsingle';
import { Category } from './Staff/category/category';
import { Feedback } from './Student/feedback/feedback';
import { Payment1 } from './payment1/payment1';
import { Staffmaster1 } from './Staff/staffmaster1/staffmaster1';
import { Monthlydetails } from './Staff/monthlydetails/monthlydetails';
import { Stockupdate } from './Admin/stockupdate/stockupdate';
import { Customerorder } from './Admin/customerorder/customerorder';
import { Viewdetails } from './Admin/viewdetails/viewdetails';
import { Paymentview } from './Admin/paymentview/paymentview';
import { Guestmaster1 } from './Guest/guestmaster1/guestmaster1';
import { Menu1 } from './Guest/menu1/menu1';
import { Menu2 } from './Guest/menu2/menu2';
import { Feedbackview } from './Admin/feedbackview/feedbackview';
import { Paymentreport } from './Admin/paymentreport/paymentreport';
import { Salesreport } from './Admin/salesreport/salesreport';
import { Eventreg } from './Admin/eventreg/eventreg';
import { Eventfoodreg } from './Admin/eventfoodreg/eventfoodreg';

export const routes: Routes = [
    { path: '', redirectTo: 'guestmaster/guesthome', pathMatch: 'full' },
    {
        path: 'guestmaster', component: Guestmaster,
        children: [
            { path: 'guesthome', component: Guesthome },
            { path: 'menu1', component: Menu1 },
            { path: 'menu2/:category_id', component: Menu2 },
            { path: 'about', component: About },
        ]
    }, { path: 'login', component: Login }, { path: 'studentregistration', component: Studentregistration },
    { path: 'payment', component: Payment },  { path: 'feedback', component: Feedback },
    { path: 'payment1', component: Payment1 },
    {
        path: 'adminmaster', component: Adminmaster,
        children: [
            { path: 'adminhome', component: Adminhome },
            { path: 'categoryregistration', component: Categoryregistration },
            { path: 'categoryview', component: Categoryview },
            { path: 'categoryedit/:category_id', component: Categoryedit },
            { path: 'staffregistration', component: Staffregistration },
            { path: 'staffview', component: Staffview },
            { path: 'staffedit/:staff_id', component: Staffedit },
            { path: 'foodregistration', component: Foodregistration },
            { path: 'foodview', component: Foodview },
            { path: 'stockupdate', component: Stockupdate },
            { path: 'customerorder', component: Customerorder },
            { path: 'customerorderdetails/:bookingmaster_id', component: Viewdetails },
            { path: 'paymentview', component: Paymentview },
            { path: 'feedbackview', component: Feedbackview },
            { path: 'paymentreport', component: Paymentreport },
            { path: 'salesreport', component: Salesreport },
            { path: 'eventreg', component: Eventreg },
            { path: 'eventfoodreg/:event_id', component: Eventfoodreg },
            
        ]

    },
    {
        path: 'studentmaster', component: Studentmaster,
        children: [{ path: 'studenthome', component: Studenthome },
        { path: 'orderview', component: Orderview },
        { path: 'categorydetails', component: Categorydetails },
        { path: 'singleview/:category_id', component: Singleview },
        { path: 'foodsingle/:food_id', component: Foodsingle },
        { path: 'cartview', component: Cartview },
        { path: 'about', component: About },


        ]
    },
    {
        path: 'staffmaster', component: Staffmaster,
        children: [{ path: 'staffhome', component: Staffhome },
        { path: 'category', component: Category },
        { path: 'orderdetails', component: Orderdetails },
        { path: 'monthlydetails', component: Monthlydetails },
        { path: 'cartdetails', component: Cartdetails },
        { path: 'viewsingle/:category_id', component: Viewsingle },
        { path: 'singlefood/:food_id', component: Singlefood },
        { path: 'about', component: About },

        ]
    },
    { path: 'staffpayment', component: Staffpayment },

    {
        path: 'studentmaster1', component: Studentmaster1,
        children: [{ path: 'cartview', component: Cartview },
        { path: 'categorydetails', component: Categorydetails },
        { path: 'singleview/:category_id', component: Singleview },
        { path: 'foodsingle/:food_id', component: Foodsingle },

        ]
    },
    {
        path: 'staffmaster1', component: Staffmaster1,
        children: [{ path: 'cartdetails', component: Cartdetails },
        { path: 'viewsingle/:category_id', component: Viewsingle },
        { path: 'singlefood/:food_id', component: Singlefood },]
    },
    {
        path: 'guestmaster1', component: Guestmaster1,
        children: [{ path: 'menu1', component: Menu1 },
        { path: 'menu2/:category_id', component: Menu2 },]
    }];
