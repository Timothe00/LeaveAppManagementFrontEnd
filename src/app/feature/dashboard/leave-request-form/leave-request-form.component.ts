import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveType } from 'src/app/core/models/leaveType.model';
import { postLeave } from 'src/app/core/models/postLeave';
import { UpdateLeave } from 'src/app/core/models/updateLeave.model';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RequestService } from 'src/app/core/services/request/request.service';
import { UserInTokenService } from 'src/app/core/services/userInToken/user-in-token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent {

  leaves!: LeaveType[];
  primarysId!: string;
  isHidden: boolean = true; // hidden par defaut
  currentForm!: FormGroup;
  isUpdate: boolean= false;
  isLoading: boolean = false;

  role!: string;

  addLeaveForm!: FormGroup

  updateLeaveForm = new FormGroup({
    id: new FormControl(),
    dateStart: new FormControl(new Date, [Validators.required]),
    dateEnd: new FormControl(new Date, [Validators.required]),
    leaveId: new FormControl(0, [Validators.required]),
    commentary: new FormControl('', [Validators.required]),
    dateRequest: new FormControl(new Date(), [Validators.required]),
    primarysId: new FormControl([Validators.required]),
    status: new FormControl([Validators.required]),
  });

  constructor(
    private req: RequestService,
    private userToken: UserInTokenService,
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    const user = this.userToken.getInfoUserToken();
    this.primarysId = user.primarysid
    this.initForm()
    this.userToken.getUserRoleFromToken()
    .subscribe(value =>{
      const roleFromToken = this.auth.getRoleInToken();
      this.role = value|| roleFromToken
    })
    const leavId = this.route.snapshot.params['id'];
    this.isUpdate = !!leavId;

    if (this.isUpdate) {
      this.currentForm = this.updateLeaveForm;
      this.getRequestById(leavId);
    } else {
      this.currentForm = this.addLeaveForm;
    }

    this.api.getLeaveType().pipe().subscribe((res) => {
      this.leaves = res
    })
  }

  initForm(){
    this.addLeaveForm  = new FormGroup({
      dateRequest: new FormControl(new Date(), [Validators.required]),
      dateStart: new FormControl(new Date(), [Validators.required]),
      dateEnd: new FormControl(new Date, [Validators.required]),
      leaveId: new FormControl(0, [Validators.required]),
      commentary: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(1000)]),
      primarysId: new FormControl(this.primarysId,[Validators.required]),
      leaveTypeId: new FormControl([Validators.required]),
      status: new FormControl('En attente', [Validators.required]),
    });
  }

  getErrorMessage(formControlName: string) {
    const control = this.currentForm.get(formControlName);
    if (control?.hasError('required') && control?.touched) {
      return 'Ce champ est obligatoire.';
    } else if (control?.hasError('maxlength')) {
      return `Le champ doit contenir 100 caractères maximum.`;
    }else if (control?.hasError('minlength')) {
      return `Le champ doit contenir au moins 5 caractères.`;
    } else {
      return null;
    }
  }

  getRequiredMessage(formControlName: string) {
    const control = this.currentForm.get(formControlName);
    if (control?.hasError('required')) {
      return '*';
    } else {
      return null;
    }
  }

  getRequestById(leavId: number): void {
    this.req.getRequestByIdInTable(leavId).subscribe({
      next: (val: any) => {
        this.updateLeaveForm.patchValue(val);
      },
      error: (err: any) => {
        console.error('Erreur lors de l\'accès à l\'utilisateur', err);
      }
    });
  }


  onSubmit(): void {
    if (this.currentForm.valid) {
      this.isLoading = true;
      if (this.isUpdate) {
        const leavId = this.currentForm.value.id;
        const updateLeave: UpdateLeave = {
          id: leavId,
          dateRequest: this.updateLeaveForm.value.dateRequest!,
          dateStart: this.updateLeaveForm.value.dateStart!,
          dateEnd: this.updateLeaveForm.value.dateEnd!,
          commentary: this.updateLeaveForm.value.commentary!,
          leaveTypeId: this.updateLeaveForm.value.leaveId!
        }

        this.req.updateRequestInTable(leavId, updateLeave).subscribe({
          next: (response: any) => {
            this.isLoading = false;
            console.log('Mise à jour de la demande', response);
            Swal.fire({
              title: "Super!",
              text: "Modification éffectuée avec succès!",
              icon: "success"
            });
            this.router.navigate(['dashboard/LeaveResquestList']);
          },
          error: (err: any) => {
            console.error('Erreur lors de l\'ajout de la demande', err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Erreur lors de la modification"
            });
          }
        });
      } else {
        const reqst: postLeave = {
          dateRequest: this.addLeaveForm.value.dateRequest,
          dateStart: this.addLeaveForm.value.dateStart,
          dateEnd: this.addLeaveForm.value.dateEnd,
          commentary: this.addLeaveForm.value.commentary,
          employeeId: this.addLeaveForm.value.primarysId,
          requestStatus: this.addLeaveForm.value.status,
          leaveTypeId: this.addLeaveForm.value.leaveId
        }
        this.req.addRequestInTable(reqst).subscribe({
          next: (response: any) => {
            console.log('Ajout demande', response);
            Swal.fire({
              title: "Super!",
              text: "Demande éffectuée avec succès!",
              icon: "success"
            });
            this.isLoading = false; // Désactivation du loader
            this.router.navigate(['dashboard/LeaveResquestList']);
          },
          error: (err: any) => {
            console.error('Erreur lors de l\'ajout de la demande', err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Erreur lors de l'ajout de la demande"
            });
            //arreter le chargement
            this.isLoading = false;
          }
        });
      }
    }
  }
}



