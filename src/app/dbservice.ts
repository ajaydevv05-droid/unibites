import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Dbservice {
  // base URL of the backend API
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  login(data: any) {
    return this.http.post('http://localhost:3000/login', data).toPromise();
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `http://localhost:3000/upload`,
      formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  insertcategory(data: any) {
    return this.http.post('http://localhost:3000/categoryregistration', data).toPromise();
  }
  categoryview() {
    return this.http.get("http://localhost:3000/categoryview").toPromise()
  }
  deletecategory(data: any) {
    return this.http.post("http://localhost:3000/deletecategory", data).toPromise()
  }
  editcategory(category_id: any) {
    return this.http.post('http://localhost:3000/editcategory', category_id).toPromise();
  }
  updatecategory(data: any) {
    return this.http.post('http://localhost:3000/updatecategory', data).toPromise();
  }
  insertstaff(data: any) {
    return this.http.post('http://localhost:3000/staffregistration', data).toPromise();
  }
  staffview() {
    return this.http.get("http://localhost:3000/staffview").toPromise()
  }
  deletestaff(data: any) {
    return this.http.post("http://localhost:3000/deletestaff", data).toPromise()
  }
  editstaff(staff_id: any) {
    return this.http.post('http://localhost:3000/editstaff', staff_id).toPromise();
  }
  updatestaff(data: any) {
    return this.http.post('http://localhost:3000/updatestaff', data).toPromise();
  }
  insertfood(data: any) {
    return this.http.post('http://localhost:3000/foodregistration', data).toPromise();
  }
  foodview() {
    return this.http.get("http://localhost:3000/foodview").toPromise()
  }
  categoryget() {
    return this.http.get('http://localhost:3000/categoryview').toPromise();
  }
  getcategorybyid(category_id: any) {
    return this.http.post('http://localhost:3000/getcategorybyid', category_id).toPromise();
  }
  insertstudent(data: any) {
    return this.http.post('http://localhost:3000/studentregistration', data).toPromise();
  }
  singleview(category_id: any) {
    return this.http.post('http://localhost:3000/singleview', category_id).toPromise();
  }
  foodsingle(food_id: any) {
    return this.http.post('http://localhost:3000/foodsingle', food_id).toPromise();
  }
  insertcart(data: any) {
    return this.http.post('http://localhost:3000/insertcart', data).toPromise();
  }
  cartview(login_id: any) {
    return this.http.post("http://localhost:3000/cartview?login_id=", login_id).toPromise()
  }
  placeorder(data: any) {
    return this.http.post("http://localhost:3000/placeorder", data).toPromise()
  }
  placepayment(data: any) {
    return this.http.post("http://localhost:3000/placepayment", data).toPromise()
  }
  orderview(login_id: any) {
    return this.http.post("http://localhost:3000/orderview?login_id=", login_id).toPromise()
  }

  staffpayment(data: any) {
    return this.http.post("http://localhost:3000/staffpayment", data).toPromise()
  }
  stafforder(data: any) {
    return this.http.post("http://localhost:3000/stafforder", data).toPromise()
  }
  orderview1(data: any) {
    return this.http.post("http://localhost:3000/orderview1", data).toPromise()
  }
  monthlypayment(data: any) {
    return this.http.post("http://localhost:3000/monthlypayment", data).toPromise()
  }
  updateStock(data: any) {
    return this.http.post("http://localhost:3000/updatestock", data).toPromise()
  }
  getRecentOrders() {
    return this.http.get("http://localhost:3000/recentorders").toPromise()
  }
  viewdetails(data: any) {
    return this.http.post("http://localhost:3000/viewdetails", data).toPromise()
  }
  getcustomer(data: any) {
    return this.http.post("http://localhost:3000/getcustomer", data).toPromise()
  }
  completed(data: any) {
    return this.http.post("http://localhost:3000/completed", data).toPromise()
  }

  getPayments() {
    return this.http.get("http://localhost:3000/customerpayment").toPromise();
  }

  filterPayments(data: any) {
    return this.http.post("http://localhost:3000/customerpayment/filter", data).toPromise();
  }
  submitFeedback(data: any) {
    return this.http.post('http://localhost:3000/submitfeedback', data).toPromise();
  }
  feedbackview() {
    return this.http.get('http://localhost:3000/feedbackview').toPromise();
  }
  singlefeedback(data: any) {
    return this.http.post('http://localhost:3000/singlefeedback', data).toPromise();
  }
  paymentreport(data: any) {
    return this.http.post("http://localhost:3000/paymentreport", data).toPromise();
  }
  salesreport(data: any) {
    return this.http.post("http://localhost:3000/salesreport", data).toPromise();
  }
  insertevent(data: any) {
    return this.http.post('http://localhost:3000/insertevent', data).toPromise();
  }
  eventfoodreg(data: any) {
    return this.http.post('http://localhost:3000/eventfoodreg', data).toPromise();
  }
  geteventfoods(data: any) {
    return this.http.post('http://localhost:3000/geteventfoods', data).toPromise();
  }
    deleteeventfood(eventfood_id: any) {
    return this.http.post("http://localhost:3000/deleteeventfood", {eventfood_id: eventfood_id}).toPromise()
  }
  // getDashboard(fromDate?: string, toDate?: string) {
  //   // construct the dashboard endpoint; baseUrl is now initialized in the service
  //   let url = `${this.baseUrl}/adminhome`;

  //   if (fromDate && toDate) {
  //     url += `?from=${fromDate}&to=${toDate}`;
  //   }

  //   return this.http.get(url).toPromise();
  // }
  eventviewWithFoods() {
  return this.http
    .get('http://localhost:3000/eventwithfood')
    .toPromise();
}

voteFood(eventfood_id: number) {
  return this.http
    .post('http://localhost:3000/eventvote', { eventfood_id })
    .toPromise();
}
getOrderChart()
{
    return this.http.get("http://localhost:3000/deleteeventfood").toPromise()
}
getSalesReport(){
    return this.http.get("http://localhost:3000/getSalesReport").toPromise()
}
getdashboard(){
  return this.http.get("http://localhost:3000/adminhome").toPromise()
}
verifyOtp(data:any){
  return this.http.post("http://localhost:3000/verify",data).toPromise()
}
sendOtp(data:any){
  return this.http.post("http://localhost:3000/send",data).toPromise()
}
getEventResults(){
  return this.http.get("http://localhost:3000/eventresults").toPromise();
}
fooddelete(data: any) {
  return this.http.post("http://localhost:3000/fooddelete", data).toPromise();
}
}