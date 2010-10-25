
<%@ page import="com.yahoo.drwho.Enemy" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'enemy.label', default: 'Enemy')}" />
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
                        
                            <g:sortableColumn property="id" title="${message(code: 'enemy.id.label', default: 'Id')}" />
                        
                            <g:sortableColumn property="desc" title="${message(code: 'enemy.desc.label', default: 'Desc')}" />
                        
                            <g:sortableColumn property="image" title="${message(code: 'enemy.image.label', default: 'Image')}" />
                        
                            <g:sortableColumn property="name" title="${message(code: 'enemy.name.label', default: 'Name')}" />
                        
                        </tr>
                    </thead>
                    <tbody>
                    <g:each in="${enemyInstanceList}" status="i" var="enemyInstance">
                        <tr class="${(i % 2) == 0 ? 'odd' : 'even'}">
                        
                            <td><g:link action="show" id="${enemyInstance.id}">${fieldValue(bean: enemyInstance, field: "id")}</g:link></td>
                        
                            <td>${fieldValue(bean: enemyInstance, field: "desc")}</td>
                        
                            <td>${fieldValue(bean: enemyInstance, field: "image")}</td>
                        
                            <td>${fieldValue(bean: enemyInstance, field: "name")}</td>
                        
                        </tr>
                    </g:each>
                    </tbody>
                </table>
            </div>
            <div class="paginateButtons">
                <g:paginate total="${enemyInstanceTotal}" />
            </div>
        </div>
    </body>
</html>
