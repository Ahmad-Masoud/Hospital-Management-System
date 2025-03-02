from django import forms
from app.models import Patient



class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        fields = ['name', 'email','problem', 'phone', 'age', 'gender', 'doctor', 'date']
