

// Si ves la palabra pulsa espacio.

class Ejercicio25:GLib.Object
	palabras: list of Texto
	palabras_str:list of string
	palabra:string
	salir:Imagen
	corregir:Imagen
	mireloj : uint
	numtext:int=0
	numtempo:int=0
	dificultad:int=5
	aciertos:int=0
	fin:bool
	init 
		palabras_str=new list of string
		palabras= new list of Texto
		
	def inicio()
		aciertos=0
		numtext=0
		numtempo=0
		fin=false
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		palabras_str.clear()
		palabras.clear()
		
		palabras_str=datos.toma_palabras_alumno(9)
		var palabras_str2=datos.toma_palabras_alumno(9)
		palabra=palabras_str[0]
		palabras_str.add (palabra)
		palabras_str.add (palabra)
		for var i=0 to ultimo_de_lista (palabras_str2)
			palabras_str.add(palabras_str2[i])
		desordena_lista_string(ref palabras_str)
		
		// creamos las palabras
		var y=0
		var x=0
		for var i=0 to ultimo_de_lista(palabras_str)
			palabras.add (new Texto (100+y,45*x+100, Mm(palabras_str[i].replace("_",""))))
			palabras.last().arrastrable=false
			palabras.last().set_tamanotexto(20)
			palabras.last().set_letravisible(false)
			palabras.last().set_fondovisible(false)
			palabras.last().valor_bool=true
			palabras.last().valor_int=i
			if i==5 or i==10 or i==15 
				y+=200
				x=0
			else
				x+=1
				
		mireloj = Timeout.add(50, mover)
		
		menu_principal.key_press_event.connect(on_teclado)
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Pulsa espacio si crees ver la palabra:")+"  "+palabra.replace("_","")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
		explicacion.arrastrable=false
		
		// mostrar dificultades
		var boton_dificultad=(new Texto(900,300, Mm (t.t("Dif:")+dificultad.to_string() )))
		boton_dificultad.izq_pulsado.connect (on_dificultad)
		boton_dificultad.arrastrable=false
		boton_dificultad.visible=true
		boton_dificultad.set_tamanotexto(20)
		
		///creando mandos
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		var continuar=new Imagen(920,170,directorio_datos+"/imagenes/flecha_der.png")
		continuar.set_tamano(50,50)
		continuar.arrastrable=false
		continuar.izq_pulsado.connect(on_continuar)
		continuar.visible=true
		
	def on_dificultad (c:Control)
		dificultad+=1
		if dificultad>5 do dificultad=0
		c.set_texto("dif:"+dificultad.to_string())
	
	def on_salir(c:Control)
		Source.remove (mireloj)
		menu_principal.key_press_event.disconnect(on_teclado)
		controles.clear()
		menu_principal.inicio()
		
	def on_continuar()
		Source.remove (mireloj)
		menu_principal.key_press_event.disconnect(on_teclado)
		controles.clear()
		this.inicio()
		
			
	def mover ():bool
		if not fin
			numtempo+=1
			
			if numtempo>1
				palabras[numtext].set_colorfondo(rojo)
				
			if numtempo>5
				palabras[numtext].set_letravisible(true)
				palabras[numtext].set_fondovisible(true)
				palabras[numtext].set_colorletra(negro)
				palabras[numtext].set_colorfondo(blanco)
				
			if numtempo>10+(dificultad*7) 
				palabras[numtext].set_colorletra(amarillo)
				palabras[numtext].set_colorfondo(amarillo)

			if numtempo>20+(dificultad*7)
				palabras[numtext].set_letravisible(false)
				palabras[numtext].set_fondovisible(false)
				numtext+=1
				if numtext>ultimo_de_lista(palabras) do numtext=0
				
				while palabras[numtext].valor_bool==false
					numtext+=1
					if numtext>ultimo_de_lista(palabras) do numtext=0
				numtempo=0
			menu_principal.lienzo.queue_draw()
		return true
		
		
	def cargar_escenario()
		controles.clear()
	
	def on_teclado(evt:Gdk.EventKey):bool
		print evt.keyval.to_string()
		if palabras[numtext].get_texto()==palabra.replace("_","")
			palabras[numtext].valor_bool=false
			sonidos.play("blub")
			aciertos+=1
			if aciertos==3
				sonidos.play("ondo")
				Source.remove (mireloj)
				datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Tres veces encontrada la palabra "+palabra.replace("_",""))
		
		else
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+" ---- Solución: "+palabra.replace("_","")+" ---- Respuesta:"+palabras[numtext].get_texto())
		
		return true
