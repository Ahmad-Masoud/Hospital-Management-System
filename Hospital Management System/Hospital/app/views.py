from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from app.forms import PatientForm
from app.models import Patient


def index(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = PatientForm()

    patients = Patient.objects.all()
    return render(request, 'index.html', {'form': form, 'patients': patients})


@csrf_exempt
def update_status(request, patient_id):
    if request.method == 'POST':
        patient = Patient.objects.get(id=patient_id)
        patient.status = request.POST.get('status')
        patient.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False})

def book_appointment(request):
    if request.method == 'POST':
        # Extract data from the form
        name = request.POST.get('name')
        email = request.POST.get('email')
        problem = request.POST.get('problem')
        phone = request.POST.get('phone')
        age = request.POST.get('age')
        gender = request.POST.get('gender')
        doctor = request.POST.get('doctor')
        date = request.POST.get('date')

        patient = Patient(
            name=name,
            email=email,
            problem=problem,
            phone=phone,
            age=age,
            gender=gender,
            doctor=doctor,
            date=date,
            status='Appointment Pending'
        )
        patient.save()

        return redirect('index')
    return render(request, 'Hospital/index.html')