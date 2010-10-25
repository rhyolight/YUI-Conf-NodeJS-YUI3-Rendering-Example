package com.yahoo

class DoctorWhoStoreService {

    def getEnemies() {
        [
    		[
    			name: "Cybermen",
    			desc: "Decimated by disease the inhabitants of Mondas used surgery to cybernetically augment limbs and organs.",
    			image: "http://upload.wikimedia.org/wikipedia/en/thumb/9/97/Cyberman.jpg/200px-Cyberman.jpg"
    		],
    		[
    			name: "Daleks",
    			desc: "The Doctor’s greatest enemy, the self-professed masters of the universe. Every Doctor has encountered the Daleks.",
    			image: "http://upload.wikimedia.org/wikipedia/en/thumb/6/69/Dalek_2010_Redesign.jpg/200px-Dalek_2010_Redesign.jpg"
    		],
    		[
    			name: "Slitheen",
    			desc: "A very unpleasant family of aliens intent on destroying the Earth.",
    			image: "http://upload.wikimedia.org/wikipedia/en/thumb/6/68/Slitheen.jpg/200px-Slitheen.jpg"
    		]
    	]
    }
    
    def getDoctors() {
        [
            [
                name: 'William Hartnell',
                link: 'http://en.wikipedia.org/wiki/First_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/1/1a/First_Doctor_colour.jpg/220px-First_Doctor_colour.jpg',
                desc: "The First Doctor is the initial incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by the actor William Hartnell from 1963 to 1966. Hartnell reprised the role in the tenth anniversary story The Three Doctors in 1973 - albeit in a reduced capacity due to his ailing health. Actor Richard Hurndall played the part of the First Doctor in the 20th anniversary story The Five Doctors after William Hartnell's death in 1975. A cinematic version of the character, Dr Who, was played by Peter Cushing. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change."
            ],
            [
                name: 'Patrick Troughton',
                link: 'http://en.wikipedia.org/wiki/Second_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Second_Doctor_b.jpg/200px-Second_Doctor_b.jpg',
                desc: "The Second Doctor is the second incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by character actor Patrick Troughton. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change."
            ],
            [
                name: 'Jon Pertwee',
                link: 'http://en.wikipedia.org/wiki/Third_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/0/07/Third_Doctor.jpg',
                desc: "The Third Doctor is the third incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by actor Jon Pertwee. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, his body automatically regenerates; as a result, his physical appearance and personality change."
            ],
            [
                name: 'Tom Baker',
                link: 'http://en.wikipedia.org/wiki/Fourth_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Fourth_Doctor.jpg/250px-Fourth_Doctor.jpg',
                desc: "The Fourth Doctor is the fourth incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by Tom Baker for seven consecutive years, and remains the longest-lived incarnation of the Doctor in the show's on-screen history- counting both the classic and modern series. Because of the length of his tenure, he came to be regarded by many as \"THE Doctor\". For audiences in the United States, who saw the show only in syndication (mostly on PBS), it was this incarnation of the Doctor who is the best known, as his episodes were the ones most frequently broadcast stateside. Further proof of his popularity in the US came when American Distributor Time Life began selling his stories on VHS in the late 1970s. Time Life added Narration by Howard da Silva at the beginning and end of each episode. It was during the Fourth Doctor's time that the series' fandom took off, including the first convention in 1977 and the launch of Doctor Who Weekly in 1979. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change."
            ],
            [
                name: 'Peter Davison',
                link: 'http://en.wikipedia.org/wiki/Fifth_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Fifth_Doctor.jpg/200px-Fifth_Doctor.jpg',
                desc: "The Fifth Doctor is the fifth incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by Peter Davison. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change."
            ],
            [
                name: 'Colin Baker',
                link: 'http://en.wikipedia.org/wiki/Sixth_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Sixth_Doctor.jpg/200px-Sixth_Doctor.jpg',
                desc: "The Sixth Doctor is the sixth incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by Colin Baker. Although his televisual time on the series was comparatively brief and turbulent, Baker has gone on to find consistent critical acclaim as the Sixth Doctor in Big Finish's range of original Doctor Who audio adventures. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change. The Sixth Doctor's brightly coloured, mismatched clothes and brash, overbearing personality set him apart from all his previous incarnations, in some ways hearkening back to the early irascibility and undertones of untrustworthiness of the First Doctor."
            ],
            [
                name: 'Sylvester McCoy',
                link: 'http://en.wikipedia.org/wiki/Seventh_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Seventh_Doctor.jpg/200px-Seventh_Doctor.jpg',
                desc: "The Seventh Doctor is the seventh incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by the actor Sylvester McCoy. Within the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change. McCoy portrays the seventh such incarnation, a whimsical, thoughtful character who quickly becomes more layered, secretive and manipulative. His first companion was Melanie Bush (Bonnie Langford), a computer programmer who travelled with his previous self, and who is soon succeeded by troubled teenager and explosives expert Ace (Sophie Aldred), who becomes his protégée."
            ],
            [
                name: 'Paul McGann',
                link: 'http://en.wikipedia.org/wiki/Eighth_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/6/69/Eighth_Doctor.jpg/200px-Eighth_Doctor.jpg',
                desc: "The Eighth Doctor is the eighth incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He was portrayed by Paul McGann. Though he appeared in only one TV film, his adventures are extensively portrayed in other media. Within the series' narrative, the Doctor is a centuries-old alien, a Time Lord from the planet Gallifrey, who travels in time in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body but in doing so gains a new physical appearance and with it, a distinct new personality. McGann portrays the eighth such incarnation, a passionate, enthusiastic and eccentric character. His only companion in the television movie is Grace Holloway (Daphne Ashbrook), a medical doctor whose surgery is responsible for triggering his regeneration. In the continued adventures of the character depicted in audio dramas, novels and comic books he travels alongside numerous other companions, including self styled \"Edwardian Adventuress\" Charley, the alien Destrii and present-day humans Lucie and Sam."
            ],
            [
                name: 'Christopher Eccleston',
                link: 'http://en.wikipedia.org/wiki/Ninth_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Ninth_Doctor.jpg/200px-Ninth_Doctor.jpg',
                desc: "The Ninth Doctor is the ninth incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He is played by Christopher Eccleston. \"Unofficial\" Ninth Doctors include the Ninth Doctor played by Rowan Atkinson in the charity parody Doctor Who and the Curse of Fatal Death and the Ninth Doctor voiced by Richard E. Grant in the animated webcast Scream of the Shalka (to avoid confusion with Eccleston's incarnation Grant's Doctor is referred to as the Shalka Doctor by fans). This article is about the official Ninth Doctor, whose tenure as the Doctor made up series 1 of the revived programme in 2005. Within the series' narrative, the Doctor is a centuries-old alien, a Time Lord from the planet Gallifrey, who travels in time in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body but in doing so gains a new physical appearance and with it, a distinct new personality. Eccleston portrays the ninth such incarnation, a brooding and melancholic war survivor after a Time War in which he wiped out both his race and the enemy Daleks. His first companion is Rose (Billie Piper), whom he plucks from obscurity on the planet Earth and to whom he grows increasingly attached. Eccleston's Doctor also travels briefly with unruly boy-genius Adam (Bruno Langley) and with 51st century con man and former 'Time Agent' Captain Jack Harkness (John Barrowman)."
            ],
            [
                name: 'David Tennant',
                link: 'http://en.wikipedia.org/wiki/Tenth_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/2/2c/Tenth_Doctor.jpg/200px-Tenth_Doctor.jpg',
                desc: "The Tenth Doctor is the tenth incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. He is played by David Tennant, who appears in three series, as well as eight specials. As with previous incarnations of the Doctor, the character has also appeared in other Doctor Who multimedia. In the series' narrative, the Doctor is a centuries-old Time Lord alien from the planet Gallifrey who travels in time in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body; in doing so, his physical appearance and personality change. Tennant portrays the tenth such incarnation. This incarnation's companions have included working class shop assistant Rose Tyler (Billie Piper), medical student Martha Jones (Freema Agyeman) and fiery temp worker Donna Noble (Catherine Tate); he eventually parts ways with them all by the end of the 2008 series finale, \"Journey's End\", after which he attempted to travel alone for the duration of the 2008-10 specials."
            ],
            [
                name: 'Matt Smith',
                link: 'http://en.wikipedia.org/wiki/Eleventh_Doctor',
                image: 'http://upload.wikimedia.org/wikipedia/en/thumb/4/44/Doctor3.png/210px-Doctor3.png',
                desc: "The Eleventh Doctor is the eleventh and current incarnation of the protagonist of the long-running BBC television science-fiction series Doctor Who. Matt Smith plays this incarnation, replacing David Tennant's Tenth Doctor in the 2010 episode \"The End of Time, Part Two\".[6] As of 2010, the BBC has confirmed that Smith is to appear in at least two series,[7] the first of which began on 3 April 2010.[8][9] Within the series' narrative, The Doctor is a centuries-old alien, a Time Lord from the planet Gallifrey, who travels in time and space in his TARDIS, frequently with companions. When the Doctor is critically injured, he can regenerate his body but in doing so gains a new physical appearance and with it, a distinct new personality. Smith portrays the eleventh such incarnation, a quick-tempered but compassionate man whose youthful appearance is at odds with his more discerning and world-weary temperament."
            ],
        ]
    }
}
