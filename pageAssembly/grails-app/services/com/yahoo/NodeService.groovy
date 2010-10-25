package com.yahoo

import com.yahoo.drwho.*
import grails.converters.JSON
import org.codehaus.groovy.grails.plugins.web.taglib.ApplicationTagLib
import groovyx.net.http.HTTPBuilder

class NodeService {
    def NODE_SERVER = "http://127.0.0.1:8088"
    def FORCE_RENDERER_RELOAD = false
    
    def g = new ApplicationTagLib()
    def js = [
        doctors:g.createLinkTo(dir:'js/renderers', file:"doctors.js", absolute: true).replace('localhost', '127.0.0.1'),
        doctorDetail:g.createLinkTo(dir:'js/renderers', file:"doctorDetail.js", absolute: true).replace('localhost', '127.0.0.1'),
        enemies:g.createLinkTo(dir:'js/renderers', file:"enemies.js", absolute: true).replace('localhost', '127.0.0.1')
    ]
    
    def getMarkupFor(types, forceReload) {
        forceReload = forceReload || FORCE_RENDERER_RELOAD
        def markups = [:]
        
        println "\n!! making asynchronous calls to NodeJS to render ${types}"
        types.each { type ->
            Thread.start {
                println "sending $type render request to $NODE_SERVER"
                def upper = type[0].toUpperCase() + type[1..-1]
                markups[type] = this."get${upper}Markup"(forceReload)
                println "$type markup received!"
            }
        }

        while (markups.keySet().size() < types.size()) {
            this.sleep(10);
        }
        println "All markup for $types has been received!"
        markups
    }

    def getDoctorsMarkup(forceReload) {
        queryNodeForMarkup('doctors', Doctor.list(), forceReload)
    }
    
    def getDoctorDetailMarkup(id, forceReload) {
        queryNodeForMarkup('doctorDetail', Doctor.get(id).toJSONStructure(), forceReload)
    }
    
    def getEnemiesMarkup(forceReload) {
        queryNodeForMarkup('enemies', Enemy.list(), forceReload)
    }
    
    def queryNodeForMarkup(type, data, forceReload) {
        forceReload = forceReload == null ? FORCE_RENDERER_RELOAD : forceReload
        println "Calling nodejs for ${type} markup..."
        def dataString = (data as JSON).toString()
        def encodedData = dataString.encodeAsURL()
        def markup
        def http = new HTTPBuilder(NODE_SERVER)
        http.post(contentType: 'text/plain',
                 query: [
                    js:js[type].encodeAsURL(),
                    force: forceReload
                 ],
                 body: [ data: encodedData ] ) { resp, reader ->
            println "response status: ${resp.statusLine}"
            markup = reader.text.decodeURL()
        }
        markup
    }
}
