
// Ordena las silabas según las has escuchado.

class Ejercicio9:GLib.Object
	silabas: list of Texto
	solucion: list of int
	lista_ordenada:list of string
	imagen: Imagen
	palabra:string
	palabra_ordenada:string
	num:int=0
	x:int=420
	salir:Imagen
	corregir:Imagen
	iman:Rectangulo
	mireloj : uint
	tiempo:int
	bloqueado:bool=false
	init 
		
		lista_ordenada= new list of string
		silabas= new list of Texto
		solucion= new list of int
	def inicio()
		// inicializamos tiempo a 20 para que no diga nada. Hablará cuando sea 0 pulsando la imagen "play"
		tiempo=20
		// podemos mover las letras, si esta bloqueado no podremos moverlas porque estamos escuchando.
		bloqueado=false
		
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		// iman es el cuadrado donde se meterán las silabaas
		iman= new Rectangulo (20,400,800,150)
		iman.set_colorfondo(amarillo)
		
		// en palabra_ordenada guardamos la solucion correcta para que sea comparada
		var lista_silabas= datos.crea_lista_de_silabas_directas_con_letra_diferentes(4,"a")
		
		lista_ordenada= copia_lista_str(lista_silabas)
		desordena_lista_string(ref lista_silabas)
		solucion.clear()
		silabas.clear()
		
		var imagen= new Imagen(70,240,directorio_datos+"/imagenes/play.png")
		imagen.izq_pulsado.connect(on_imagen)
		imagen.arrastrable=false
		
		var x=200
		for var i=0 to ultimo_de_lista (lista_silabas)
			var et=new Texto(x,255,Mm(lista_silabas[i]))
			silabas.add(et)
			silabas.last().set_colorfondo(blanco)
			silabas.last().soltado.connect (on_soltar_letra)
			silabas.last().izq_pulsado.connect(on_tomar_letra)
			silabas.last().valor_str=lista_silabas[i]
			silabas.last().valor_int=i
			x+=silabas.last().get_ancho()+2
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Ordena las sílabas del modo que las has escuchado.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_fondovisible(false)
		explicacion.set_colorletra(blanco)
		explicacion.arrastrable=false
		
		///creando mandos
		
		salir= new Imagen(920,20,directorio_datos+"/imagenes/Terminar.png")
		salir.set_tamano(50,50)
		salir.arrastrable=false
		salir.izq_pulsado.connect(on_salir)
		
		corregir=new Imagen(920,100,directorio_datos+"/imagenes/corregir.png")
		corregir.set_tamano(50,50)
		corregir.arrastrable=false
		corregir.izq_pulsado.connect(on_corregir)
		
		Source.remove (mireloj)
		mireloj = Timeout.add(3000, timer)
		
		
	def on_soltar_letra(c:Control)
		if colision_cuadrada(iman,c)
			c.valor_bool=true
			solucion.add(c.valor_int)
			c.set_posy((iman.get_posy()+iman.get_alto()/2)-(c.get_alto()/2))
		else
			c.valor_bool=false
			if solucion.contains(c.valor_int)
				solucion.remove_at(solucion.index_of(c.valor_int))
				
		organiza_iman()
		
	def on_tomar_letra(c:Control)
		if bloqueado 
			c.arrastrable=false
		else
			c.arrastrable=true
			sonidos.play("clik")
			c.valor_bool=false
			if solucion.contains(c.valor_int)
				solucion.remove_at(solucion.index_of(c.valor_int))
			organiza_iman()
		
	def organiza_iman()
		var pos=15+iman.get_posx()
		for var i=0 to ultimo_de_lista(solucion)
			if silabas[solucion[i]].valor_bool
				silabas[solucion[i]].set_posx(pos)
				pos+=silabas[solucion[i]].get_ancho()+2

		
	def on_salir(c:Control)
		Source.remove (mireloj)
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		var ondo=true
		for var i=0 to ultimo_de_lista(solucion)
			if lista_ordenada[i]!=silabas[solucion[i]].valor_str
				ondo=false
		if tamano_de_lista(solucion)<4 do ondo=false
		if not ondo 
			sonidos.play("gaizki")
			datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Solución: "+lista_ordenada[0]+" "+lista_ordenada[1]+" "+lista_ordenada[2]+" "+lista_ordenada[3]+ " ----- Respuesta:"+silabas[solucion[0]].valor_str+" "+silabas[solucion[1]].valor_str+" "+silabas[solucion[2]].valor_str+" "+silabas[solucion[3]].valor_str)
		else
			sonidos.play("ondo")
			datos.guardar_informe ("Bien"+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Solución: "+lista_ordenada[0]+" "+lista_ordenada[1]+" "+lista_ordenada[2]+" "+lista_ordenada[3]+ " ----- Respuesta:"+silabas[solucion[0]].valor_str+" "+silabas[solucion[1]].valor_str+" "+silabas[solucion[2]].valor_str+" "+silabas[solucion[3]].valor_str)
			
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
	
	def on_imagen(c:Control)
		tiempo=0
		bloqueado=true
		
	def timer():bool
		if tiempo<=ultimo_de_lista(lista_ordenada)
			sonidos.play("archivo",directorio_datos+"/sonidos/silabak-"+ datos.alumno_idioma +"/"+lista_ordenada[tiempo]+".ogg")
		else
			bloqueado=false
		tiempo+=1
		
		return true
	
	def cargar_escenario()
		controles.clear()
	
