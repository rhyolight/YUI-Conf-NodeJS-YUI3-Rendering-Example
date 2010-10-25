
<%@ page import="com.yahoo.drwho.Doctor" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'doctor.label', default: 'Doctor')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
    </head>
    <body>
        <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <div class="list">
                <table>
                    <thead>
                        <tr>
                        
                            <g:sortableColumn property="id" title="${message(code: 'doctor.id.label', default: 'Id')}" />
                            <g:sortableColumn property="name" title="${message(code: 'doctor.name.label', default: 'Name')}" />
                            <g:sortableColumn property="image" title="${message(code: 'doctor.image.label', default: 'Image')}" />
                            <g:sortableColumn property="desc" title="${message(code: 'doctor.desc.label', default: 'Desc')}" />
                        
                        </tr>
                    </thead>
                    <tbody>
                    <g:each in="${doctorInstanceList}" status="i" var="doctorInstance">
                        <tr class="${(i % 2) == 0 ? 'odd' : 'even'}">
                        
                            <td><g:link action="show" id="${doctorInstance.id}">${fieldValue(bean: doctorInstance, field: "id")}</g:link></td>
                            <td>${fieldValue(bean: doctorInstance, field: "name")}</td>
                            <td><g:link action="show" id="${doctorInstance.id}"><img src="${fieldValue(bean: doctorInstance, field: "image")}"></g:link></td>
                            <td>${fieldValue(bean: doctorInstance, field: "desc")}</td>
                        
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
            <div class="paginateButtons">
                <g:paginate total="${doctorInstanceTotal}" />
            </div>
        </div>
    </body>
</html>
