import { Component,OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit{

constructor(public paymentDetailService: PaymentDetailService,private toastr: ToastrService){}

  ngOnInit(): void {
   this.paymentDetailService.getPaymentDataList();
  }

  populateForm(selectedRecord:PaymentDetail){
    this.paymentDetailService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    this.paymentDetailService.deletePaymentDetail(id)
    .subscribe({
      next: resp => {
        this.paymentDetailService.list = resp as PaymentDetail[];
        this.toastr.error('Deleted successfully', 'Payment Detail Register')
      },
      error: err => { console.log(err) }
    })
  }

}
