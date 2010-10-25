import com.yahoo.drwho.*

class BootStrap {
    
    def doctorWhoStoreService
    
    def init = { servletContext ->
        doctorWhoStoreService.doctors.each { doc ->
            new Doctor(name: doc.name, link: doc.link, image: doc.image, desc: doc.desc).save()
        }
        doctorWhoStoreService.enemies.each { enemy ->
            new Enemy(name: enemy.name, image: enemy.image, desc: enemy.desc).save()
        }
    }
    
    def destroy = {
    }
}
