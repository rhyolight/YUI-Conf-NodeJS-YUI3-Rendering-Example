package com.yahoo.drwho

class Doctor {

    String name
    String link
    String image
    String desc

    def toJSONStructure() {
        [
            name: this.name,
            link: this.link,
            image: this.image,
            desc: this.desc
        ]
    }
}
