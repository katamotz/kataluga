

// Ejercicio de localizar consonantes

class Ejercicio30:GLib.Object
	letras: list of Texto
	playletra: list of Imagen
	solucion: list of int
	acertadas:int
	consonantes:list of string
	sonidoletra:list of string
	palabra:string
	letra_ejercicio:string
	letra_respuesta:string
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	init 
		letras= new list of Texto
		playletra= new list of Imagen
		solucion= new list of int
		consonantes= new list of string
		sonidoletra= new list of string
		acertadas=0
		letra_respuesta="-"
		letra_ejercicio="."
		
	def inicio()
		acertadas=0
		letra_respuesta="-"
		letra_ejercicio="."
		cargar_escenario()
		// busco letras configuradas para el usuario y después les quito el acento si lo llevarán
		consonantes=datos.toma_alumno_letras_simples(4)
		for var i=0 to ultimo_de_lista(consonantes)
			consonantes[i]=elimina_acento(consonantes[i])
		//si faltan consonantes las pongo desde la base general de letras
		if tamano_de_lista(consonantes)<5
			var n=(5-tamano_de_lista(consonantes))
			print n.to_string()
			for var i=1 to (n)
				var nueva= elimina_acento(datos.toma_letra_total_simple())
				while (consonantes.contains(nueva))
					nueva= elimina_acento(datos.toma_letra_total_simple())
				consonantes.add (nueva)

		

		desordena_lista_string(ref consonantes)
		sonidoletra=copia_lista_str(consonantes)
		desordena_lista_string(ref sonidoletra)
		letras.clear()
		playletra.clear()
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Escucha una letra y elige la que le corresponda.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false

		
		for var i=0 to 4
			letras.add(new Texto (100+100*i,200,Mm(consonantes[i])))
			letras.last().izq_pulsado.connect (on_corregir)
			letras.last().set_tamanotexto(70)
			letras.last().arrastrable=false
			letras.last().valor_str=consonantes[i]
		
		for var i=0 to 4
			playletra.add(new Imagen (100+100*i,400,directorio_datos+"/imagenes/green_play.png"))
			playletra.last().izq_pulsado.connect (on_playletra)
			playletra.last().set_alto(60)
			playletra.last().valor_str=sonidoletra[i]
			playletra.last().set_ancho(60)
			playletra.last().set_tamanotexto(70)
			playletra.last().arrastrable=false
		
		
		

		
		///creando mandos
		
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		
	
	def on_playletra(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/letrak-"+datos.alumno_idioma +"/letra_"+c.valor_str+".ogg")
		// hacemos que los play vuelva a la normalidad
		plays_normales()
		// aumentamos el play elegido
		c.set_posx(c.get_posx()-10)
		c.set_posy(c.get_posy()-10)
		c.set_ancho(80)
		c.set_alto(80)
		letra_ejercicio=c.valor_str
		
	def plays_normales()
		for var i=0 to 4
			playletra[i].set_ancho(60)
			playletra[i].set_alto(60)
			playletra[i].set_posx(100+100*i)
			playletra[i].set_posy(400)
	def muestra_todo()
		for var i=0 to 4
			playletra[i].visible=true
			letras[i].visible=true
			acertadas=0
	
	def on_salir(c:Control)
		menu_principal.inicio()
		
	def on_corregir(c:Control)
		if letra_ejercicio!="." // si se a escuchado alguna letra
			var error=false
			letra_respuesta=c.valor_str
			if letra_respuesta!=letra_ejercicio do error=true // si la letra del ejercicio escuchada es igal a la elegida
			plays_normales()
			
			if (error) 
				sonidos.play("gaizki")
				datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+letra_ejercicio+" ---- Respuesta: "+letra_respuesta)
				muestra_todo()
			else
				acertadas+=1
				c.visible=false
				for var i=0 to 4
					if playletra[i].valor_str==letra_ejercicio
						print "encontrado"
						playletra[i].visible=false
						
				sonidos.play("ondo")
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+letra_ejercicio+" ---- Respuesta: "+letra_respuesta)
				if acertadas==5
					controles.clear()
					if not automatico
						this.inicio()
					else
						continuando()
			letra_respuesta="-";
			letra_ejercicio=".";
	
	
	def cargar_escenario()
		controles.clear()
		pass
	
	
	
