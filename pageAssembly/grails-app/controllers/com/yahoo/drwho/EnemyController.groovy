package com.yahoo.drwho

class EnemyController {

    static allowedMethods = [save: "POST", update: "POST", delete: "POST"]

    def index = {
        redirect(action: "list", params: params)
    }

    def list = {
        params.max = Math.min(params.max ? params.int('max') : 10, 100)
        [enemyInstanceList: Enemy.list(params), enemyInstanceTotal: Enemy.count()]
    }

    def create = {
        def enemyInstance = new Enemy()
        enemyInstance.properties = params
        return [enemyInstance: enemyInstance]
    }

    def save = {
        def enemyInstance = new Enemy(params)
        if (enemyInstance.save(flush: true)) {
            flash.message = "${message(code: 'default.created.message', args: [message(code: 'enemy.label', default: 'Enemy'), enemyInstance.id])}"
            redirect(action: "show", id: enemyInstance.id)
        }
        else {
            render(view: "create", model: [enemyInstance: enemyInstance])
        }
    }

    def show = {
        def enemyInstance = Enemy.get(params.id)
        if (!enemyInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'enemy.label', default: 'Enemy'), params.id])}"
            redirect(action: "list")
        }
        else {
            [enemyInstance: enemyInstance]
        }
    }

    def edit = {
        def enemyInstance = Enemy.get(params.id)
        if (!enemyInstance) {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'enemy.label', default: 'Enemy'), params.id])}"
            redirect(action: "list")
        }
        else {
            return [enemyInstance: enemyInstance]
        }
    }

    def update = {
        def enemyInstance = Enemy.get(params.id)
        if (enemyInstance) {
            if (params.version) {
                def version = params.version.toLong()
                if (enemyInstance.version > version) {
                    
                    enemyInstance.errors.rejectValue("version", "default.optimistic.locking.failure", [message(code: 'enemy.label', default: 'Enemy')] as Object[], "Another user has updated this Enemy while you were editing")
                    render(view: "edit", model: [enemyInstance: enemyInstance])
                    return
                }
            }
            enemyInstance.properties = params
            if (!enemyInstance.hasErrors() && enemyInstance.save(flush: true)) {
                flash.message = "${message(code: 'default.updated.message', args: [message(code: 'enemy.label', default: 'Enemy'), enemyInstance.id])}"
                redirect(action: "show", id: enemyInstance.id)
            }
            else {
                render(view: "edit", model: [enemyInstance: enemyInstance])
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'enemy.label', default: 'Enemy'), params.id])}"
            redirect(action: "list")
        }
    }

    def delete = {
        def enemyInstance = Enemy.get(params.id)
        if (enemyInstance) {
            try {
                enemyInstance.delete(flush: true)
                flash.message = "${message(code: 'default.deleted.message', args: [message(code: 'enemy.label', default: 'Enemy'), params.id])}"
                redirect(action: "list")
            }
            catch (org.springframework.dao.DataIntegrityViolationException e) {
                flash.message = "${message(code: 'default.not.deleted.message', args: [message(code: 'enemy.label', default: 'Enemy'), params.id])}"
                redirect(action: "show", id: params.id)
            }
        }
        else {
            flash.message = "${message(code: 'default.not.found.message', args: [message(code: 'enemy.label', default: 'Enemy'), params.id])}"
            redirect(action: "list")
        }
    }
}
