uses SDL
uses SDLMixer

class Sonidos: Object
	clik  :SDLMixer.Chunk
	botella:SDLMixer.Chunk 
	gaizki: SDLMixer.Chunk 
	ondo0: SDLMixer.Chunk 
	ondo1: SDLMixer.Chunk 
	ondo2: SDLMixer.Chunk 
	ondo3: SDLMixer.Chunk 
	ondo4: SDLMixer.Chunk 
	ondo5: SDLMixer.Chunk 
	sartu: SDLMixer.Chunk 
	canal: SDLMixer.Channel
	musica: SDLMixer.Music
	
	init
		var botellaRW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"botella.ogg","rb")
		botella= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"botella.ogg")
		var boingRW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"boing.ogg","rb")
		gaizki= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"boing.ogg")
		var ondo0RW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"ondo0.ogg","rb")
		ondo0= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"ondo0.ogg")
		var ondo1RW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"ondo1.ogg","rb")
		ondo1= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"ondo1.ogg")
		var ondo2RW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"ondo2.ogg","rb")
		ondo2= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"ondo2.ogg")
		var ondo3RW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"ondo3.ogg","rb")
		ondo3= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"ondo3.ogg")
		var ondo4RW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"ondo4.ogg","rb")
		ondo4= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"ondo4.ogg")
		var ondo5RW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"ondo5.ogg","rb")
		ondo5= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"ondo5.ogg")
		var clikRW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"click.ogg","rb")
		clik= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"click.ogg")
		var sartuRW= new SDL.RWops.from_file (directorio_datos+directorio_sonidos+"entrando1.ogg","rb")
		sartu= new SDLMixer.Chunk.WAV (directorio_datos+directorio_sonidos+"entrando1.ogg")

	def habla_ayudas(lista:list of string)
		for var i=0 to ultimo_de_lista(lista)
			musica= new SDLMixer.Music (directorio_datos+"/sonidos/laguntzak-"+datos.alumno_idioma+"/"+lista[i]+".ogg")
			musica.play(1)
			SDL.Timer.delay(2500)

	def play (s:string,archivo:string="")
		case s
			when "blub"
				canal.play(botella,0)
			when "clik"
				canal.play(clik,0)
			when "gaizki"
				canal.play(gaizki,0)
				
			when "sartu"
				canal.play(sartu,0)
				
			when "ondo"
				var n=Random.int_range(0,6)
				case n
					when 0
						canal.play(ondo0,0)
					when 1
						canal.play(ondo1,0)
					when 2
						canal.play(ondo2,0)
					when 3
						canal.play(ondo3,0)
					when 4
						canal.play(ondo4,0)
					when 5
						canal.play(ondo5,0)
			when "archivo"
				musica= new SDLMixer.Music (archivo)
				musica.play(1)
