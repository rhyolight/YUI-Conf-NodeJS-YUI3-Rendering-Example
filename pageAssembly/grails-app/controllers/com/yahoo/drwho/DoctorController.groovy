package com.yahoo.drwho

class DoctorController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index = {
        redirect(action: "list", params: params)
    }

    def list = {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [doctorInstanceList: Doctor.list(params), doctorInstanceTotal: Doctor.count()]
    }

    def create = {
        def doctorInstance = new Doctor()
        doctorInstance.properties = params
        return [doctorInstance: doctorInstance]
    }

    def save = {
        def doctorInstance = new Doctor(params)
        if (doctorInstance.save(flush: true)) {
            flash.message = "${message(code: 'default.created.message', args: [message(code: 'doctor.label', default: 'Doctor'), doctorInstance.id])}"
            redirect(action: "show", id: doctorInstance.id)
        }
        else {
            render(view: "create", model: [doctorInstance: doctorInstance])
        }
    }

    def show = {
        def doctorInstance = Doctor.get(params.id)
        if (!doctorInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'doctor.label', default: 'Doctor'), params.id])}"
            redirect(action: "list")
        }
        else {
            [doctorInstance: doctorInstance]
        }
    }

    def edit = {
        def doctorInstance = Doctor.get(params.id)
        if (!doctorInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'doctor.label', default: 'Doctor'), params.id])}"
            redirect(action: "list")
        }
        else {
            return [doctorInstance: doctorInstance]
        }
    }

    def update = {
        def doctorInstance = Doctor.get(params.id)
        if (doctorInstance) {
            if (params.version) {
                def version = params.version.toLong()
                if (doctorInstance.version > version) {
                    
                    doctorInstance.errors.rejectValue("version", "default.optimistic.locking.failure", [message(code: 'doctor.label', default: 'Doctor')] as Object[], "Another user has updated this Doctor while you were editing")
                    render(view: "edit", model: [doctorInstance: doctorInstance])
                    return
                }
            }
            doctorInstance.properties = params
            if (!doctorInstance.hasErrors() && doctorInstance.save(flush: true)) {
                flash.message = "${message(code: 'default.updated.message', args: [message(code: 'doctor.label', default: 'Doctor'), doctorInstance.id])}"
                redirect(action: "show", id: doctorInstance.id)
            }
            else {
                render(view: "edit", model: [doctorInstance: doctorInstance])
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'doctor.label', default: 'Doctor'), params.id])}"
            redirect(action: "list")
        }
    }

    def delete = {
        def doctorInstance = Doctor.get(params.id)
        if (doctorInstance) {
            try {
                doctorInstance.delete(flush: true)
                flash.message = "${message(code: 'default.deleted.message', args: [message(code: 'doctor.label', default: 'Doctor'), params.id])}"
                redirect(action: "list")
            }
            catch (org.springframework.dao.DataIntegrityViolationException e) {
                flash.message = "${message(code: 'default.not.deleted.message', args: [message(code: 'doctor.label', default: 'Doctor'), params.id])}"
                redirect(action: "show", id: params.id)
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'doctor.label', default: 'Doctor'), params.id])}"
            redirect(action: "list")
        }
    }
}
