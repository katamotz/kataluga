
// Torre de silabas directas

class Ejercicio8:GLib.Object
	silabas: list of Texto
	l: list of string
	letras: list of string
	num:int=0
	fila:int=0
	salir:Imagen
	iman:Rectangulo
	solucion:string
	acertados:int
	init 
		silabas= new list of Texto
		l=new list of string
		letras=new list of string
	
	def inicio()
		fila=0
		num=0
		acertados=0
		solucion=""
		
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		silabas.clear()
		l.clear()
		letras.clear()
		l= datos.crea_lista_de_silabas_directas_con_letra_diferentes(4,"a")
		letras= new list of string
		
		for var j=0 to 4
			desordena_lista_string(ref l)
			for var i=0 to 3
				letras.add(l[i])
		
		var posx=0
		var posy=0
		for var i=0 to 19
			silabas.add (new Texto (300+posx*150, 100+posy*80 , Mm(letras[i])))
			silabas.last().arrastrable=false
			silabas.last().set_tamanotexto(40)
			silabas.last().izq_pulsado.connect( on_silaba_pulsada )
			silabas.last().valor_bool=false
		
			posx+=1
			if posx==4
				posx=0
				posy+=1
				
		for var i=0 to 3
			silabas[i].set_colorfondo(amarillo)
			silabas[i].valor_bool=true
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Escucha las sílaba y pulsa sobre la que le corresponde.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		explicacion.set_colorletra(blanco)
		
		var imagen= new Imagen(70,240,directorio_datos+"/imagenes/play.png")
		imagen.izq_pulsado.connect(on_imagen)
		imagen.arrastrable=false
		
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
	
	def on_silaba_pulsada (c:Control)
		if (c.get_texto().up()== solucion.up()) and (c.valor_bool==true)
			sonidos.play ("blub")
			c.visible=false
			c.valor_bool=false
			acertados+=1
			if acertados==4
				acertados=0
				fila+=1
				if fila<5
					for var i=0 to 3
						silabas[i+fila*4].valor_bool=true
						silabas[i+fila*4].set_colorfondo(amarillo)
				else
					sonidos.play("ondo")
					datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ----- Terminado correctamente ----- Silabas: "+letras[0]+"_"+letras[1]+"_"+letras[2]+"_"+letras[3])
					on_continuar()
		else
			acertados=0
			for var i=0 to 3
				silabas[i+fila*4].valor_bool=true
				silabas[i+fila*4].visible=true
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Solución: "+solucion+ " ----- Respuesta:"+c.get_texto())
					
	def on_salir(c:Control)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_continuar()
		
		controles.clear()
		if not automatico
			this.inicio()
		else
			continuando()
		
	def on_imagen(c:Control)
		if fila<5
			num= Random.int_range (4*fila,4*fila+4)
			solucion = letras[num]
			while not silabas[num].valor_bool
				num= Random.int_range (4*fila,4*fila+4)
				solucion = letras[num]
				
			sonidos.play("archivo",directorio_datos+"/sonidos/silabak-"+ datos.alumno_idioma +"/"+letras[num]+".ogg")
		
	def cargar_escenario()
		controles.clear()
	
	
	
	
