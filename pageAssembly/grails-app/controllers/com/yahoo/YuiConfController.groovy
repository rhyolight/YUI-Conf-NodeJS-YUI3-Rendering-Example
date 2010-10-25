package com.yahoo

import com.yahoo.drwho.*
import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ApplicationTagLib

class YuiConfController {

    def nodeService
    def g = new ApplicationTagLib()
    def AJAX_WAIT = 500;
    
    def dispatch = {
        println "Dispatching AJAX request..."
        if (params['meta[context]'] && params['meta[context]'] != 'default') {
            redirect(controller: params['meta[context]'], action: params['meta[action]'], params: params)
        } else {
            def status = [status: 'ready']
            render status as JSON
        }
    }
    
    def index = {
        println "\n\nPAGE REFRESH"
        def modules = ['doctors', 'enemies']
        if (params.renderOnServer) {
            println 'rendering on server'
            return render(view:'serverRender', model:[
                enemies:Enemy.list(), 
                doctors:Doctor.list()
            ])
        }
        if (params.renderOnNode) {
            println 'rendering on nodejs'
            def markups = nodeService.getMarkupFor(modules, params.forceRendererReload)
            return render(view:'nodeRender', model:[
                markups:markups.sort()
            ])
        }
        println 'rendering on client'
        render(view:'index', model:[modules:modules, modulesAsJSON:modules as JSON])
    }
    
    // JSON functions for ajax calls
    
    def enemies = {
        println "AJAX request for 'enemies' data received..."
        this.sleep(AJAX_WAIT + Math.random() * 100 as int);
        def enemies = Enemy.list()
    	render packWithRendererAsJson('enemies', enemies)
    }
    
    def doctors = {
        println "AJAX request for 'doctors' data received..."
        this.sleep(AJAX_WAIT + Math.random() * 100 as int);
        def docs = Doctor.list()
        render packWithRendererAsJson('doctors', docs)
    }
    
    def doctorDetail = {
        println "AJAX request for 'doctor details' data received..."
        
        if (params.renderOnNode) {
            println 'rendering on nodejs'
            def markup = nodeService.getDoctorDetailMarkup(params.id, params.forceRendererReload)
            println "returning markup:\n${markup}"
            return render(text: markup, contentType:"text/plain", encoding:"UTF-8")        
        }
        
        println "returning JSON for doctor detail"
        def doc = Doctor.get(params.id as int)
        def docData = doc.toJSONStructure()
        render packWithRendererAsJson('doctorDetail', docData)
    }
    
    def packWithRendererAsJson(renderer, dataArray) {
        def rendererUrl = g.createLinkTo(dir:'js/renderers', file:"${renderer}.js", absolute: true)
        [
            renderer: rendererUrl,
            data: dataArray
        ] as JSON
    }
}
