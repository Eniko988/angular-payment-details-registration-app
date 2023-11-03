import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.scss']
})
export class PaymentDetailFormComponent {
  constructor(public paymentDetailService: PaymentDetailService, private toastr: ToastrService) { }


  onSubmit(form: NgForm) {
    this.paymentDetailService.formSubmitted = true;
    if (form.valid) {
      if (this.paymentDetailService.formData.paymentDetailId == 0){
        this.insertRecord(form)
      }else{
        this.updateRecord(form)
    }}
  }

  insertRecord(form: NgForm) {
    this.paymentDetailService.postPaymentDetail()
      .subscribe({
        next: resp => {
          this.paymentDetailService.list = resp as PaymentDetail[];
          this.paymentDetailService.resetForm(form);
          this.toastr.success('Inserted successfully', 'Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
  }

  updateRecord(form: NgForm) {
    this.paymentDetailService.putPaymentDetail()
      .subscribe({
        next: resp => {
          this.paymentDetailService.list = resp as PaymentDetail[];
          this.paymentDetailService.resetForm(form);
          this.toastr.info('Updated successfully', 'Payment Detail Register')
        },
        error: err => { console.log(err) }
      })
  }
}
