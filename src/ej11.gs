
// [Error] a veces pones bien y corrige mal mirar el porque
// Une las palabras con imagenes pero con un tiempo limitado para leer.

class Ejercicio11:GLib.Object
	palabras: list of Texto
	palabras_str:list of string
	palabras_str_ordenada:list of string
	imagen: list of Imagen
	palabra:string
	solucion:string
	num:int=0
	salir:Imagen
	corregir:Imagen
	iman:list of Rectangulo
	objeto_pulsado:Control
	activado:bool
	mireloj : uint
	init 
		palabras_str=new list of string
		palabras_str_ordenada = new list of string
		palabras= new list of Texto
		imagen = new list of Imagen
		iman= new list of Rectangulo
		
	def inicio()
		solucion=""
		activado=false
		// cargar el escenario: crear el escenario y los bindings de pulsacion.
		cargar_escenario()
		
		palabras_str.clear()
		palabras_str_ordenada.clear()
		palabras.clear()
		imagen.clear()
		iman.clear()
		
		palabras_str=datos.toma_palabras_alumno(2)
		palabra=palabras_str[0]
		palabras_str_ordenada= copia_lista_str (palabras_str)
		desordena_lista_string(ref palabras_str)
		
		for var i=0 to ultimo_de_lista(palabras_str)
			// la imagen es el elemento de ayuda para que el alumno/a pueda ver que palabra tiene que rellenar.
			imagen.add( new Imagen (200,125+155*i,directorio_datos+"/fotos/"+tostring(4,datos.transforma_archivo_int(palabras_str[i]))+".png"))
			imagen.last().arrastrable=false
			imagen.last().izq_pulsado.connect(on_imagen)
			imagen.last().valor_str=palabras_str[i].replace("_","")
			imagen.last().set_tamano(150,150)
			
			
		for var i=0 to ultimo_de_lista(palabras_str)
			// la imagen es el elemento de ayuda para que el alumno/a pueda ver que palabra tiene que rellenar.
			iman.add( new Rectangulo (500,170+155*i,30,30))
			iman.last().arrastrable=false
			iman.last().valor_str=""
		
		for var i=0 to ultimo_de_lista(palabras_str)
			palabras.add (new Texto (700,55*i+100,Mm(palabras_str_ordenada[i].replace("_","")) ))
			palabras.last().izq_pulsado.connect(on_palabra)
			palabras.last().soltado.connect(on_palabra_soltada)
			palabras.last().arrastrable=true
			palabras.last().set_tamanotexto(30)
			palabras.last().set_colorletra(transparente)
			palabras.last().valor_str=palabras_str_ordenada[i].replace("_","")
			palabras.last().valor_int=-1
			palabras.last().valor_int2=i
			
		mireloj = Timeout.add(50, mover)
			
		
		//mostrar explicacion de color blanco
		var explicacion= new Texto(50,50,Mm(t.t("Coloca en cada cuadrado pequeño la palabra que corresponda a la imagen.")))
		explicacion.set_tamanotexto(20)
		explicacion.set_colorletra(blanco)
		explicacion.set_fondovisible(false)
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
		
		
	def on_salir(c:Control)
		Source.remove (mireloj)
		
		controles.clear()
		menu_principal.inicio()
		
	def on_corregir()
		var ondo=true
		for var i=0 to ultimo_de_lista(palabras_str)
			if iman[i].valor_str != imagen[i].valor_str
				datos.guardar_informe ("Mal "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ "---- Solución:"+iman[i].valor_str+" ---- Respuesta:"+imagen[i].valor_str)
				ondo=false
		if ondo
			sonidos.play("ondo")
			datos.guardar_informe ("Bien "+" ---- "+fecha_str+" ---- Ejercicio: "+nomejer[ejercicio]+ " ---- Correctamente terminado")
			
			Source.remove (mireloj)
			
			controles.clear()
			if not automatico
				this.inicio()
			else
				continuando()
		
		else
			sonidos.play("gaizki")
			
			
	def mover ():bool
		num+=1
		if (num>10) and (activado) 
			objeto_pulsado.set_colorletra(transparente)
			activado=false
		return true
		
	def on_palabra_soltada (c:Control)
		for var i=0 to ultimo_de_lista(palabras_str)
			if colision_cuadrada(c, iman[i]) and (iman[i].valor_str=="")
				c.set_centro_x( iman[i].get_centro_x() )
				c.set_centro_y( iman[i].get_centro_y() )
				iman[i].valor_str=c.valor_str
				c.valor_int=i
				c.set_colorfondo(amarillo)
				break
		
	def on_palabra (c:Control)
		if c.valor_int>=0 do iman[c.valor_int].valor_str=""
		c.set_colorfondo(blanco)
		if (not activado) and (c!=objeto_pulsado)
			solucion = c.get_texto()
			num=0
			c.set_colorletra(negro)
			objeto_pulsado=c
			activado=true
			
		
	def on_imagen(c:Control)
		sonidos.play("archivo",directorio_datos+"/sonidos/hitzsoinuak-"+datos.alumno_idioma+"/"+tostring(4,datos.transforma_archivo_int(c.valor_str))+".ogg")
		pass
		
	def cargar_escenario()
		controles.clear()
	
