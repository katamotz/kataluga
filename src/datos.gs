/*
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 */


class Datos:Object // capa de datos
	archivo_configuracion:list of string
		
	// variables necesarias para uso de listas configuradas para cada alumno.
	todas_palabras: list of string
	todas_letras: list of string
	todas_vocales: list of string
	todas_consonantes: list of string
	todas_fonemas: list of string
	todas_triples:list of string
	todas_dobles:list of string
	todas_simples:list of string
	
	alumno_fonemas:list of string
	alumno_letras:list of string
	alumno_triples:list of string
	alumno_dobles:list of string
	alumno_simples:list of string
	
	todas_silabas:list of string
	todas_silabas_directas:list of string
	alumno_palabras:list of string
	alumno_idioma:string
	todas_frases:list of string
	todas_definiciones:list of string
	alumno_nombre:string
	ejercicios_automaticos:list of int
	init
		archivo_configuracion= new list of string
		todas_triples=new list of string
		todas_dobles= new list of string
		todas_simples=new list of string
		
		alumno_triples=new list of string
		alumno_dobles=new list of string
		alumno_simples=new list of string
		
		todas_fonemas=new list of string
		todas_letras=new list of string
		todas_vocales=new list of string
		todas_consonantes=new list of string
		todas_palabras= new list of string
		
		alumno_palabras= new list of string
		alumno_letras= new list of string
		todas_silabas= new list of string
		todas_silabas_directas= new list of string
		
		todas_definiciones= new list of string
		todas_frases=new list of string
		ejercicios_automaticos= new list of int
		
	def toma_alumno_letra ():string
		return datos.alumno_letras[Random.int_range(0,tamano_de_lista(datos.alumno_letras))]
	
	def toma_alumno_letra_simple ():string
		var r=""
		if ultimo_de_lista(datos.alumno_simples)>0
			r= datos.alumno_simples[Random.int_range(0,tamano_de_lista(datos.alumno_simples))]
		return r
		
	def toma_alumno_letra_doble ():string
		return datos.alumno_dobles[Random.int_range(0,tamano_de_lista(datos.alumno_dobles))]
	
	def toma_letra_total ():string
		return datos.todas_letras[Random.int_range(0,tamano_de_lista(datos.todas_letras))]

	def toma_letra_total_simple ():string
		return datos.todas_simples[Random.int_range(0,tamano_de_lista(datos.todas_simples))]

	def toma_palabra_alumno ():string
		return datos.alumno_palabras[Random.int_range(0,tamano_de_lista(datos.alumno_palabras))]

	def toma_palabra_total ():string
		return datos.todas_palabras[Random.int_range(0,tamano_de_lista(datos.todas_palabras))]

	def toma_frase_total ():string
		return datos.todas_frases[Random.int_range(0,tamano_de_lista(datos.todas_frases))]

	def toma_alumno_letras(num:int):list of string
		letras:list of string= new list of string
		for var i=0 to (num)
			var l= this.toma_alumno_letra()
			while (letras.contains(l)) 
				l = this.toma_alumno_letra()
			letras.add(l)
		return letras

	def toma_alumno_letras_simples(num:int):list of string
		letras:list of string= new list of string
		for var i=0 to num
			var l= this.toma_alumno_letra_simple ()
			var x=0
			while (letras.contains(l)) and (x<100)
				l = this.toma_alumno_letra_simple ()
				x++
			if (x<100) and (l!="") do letras.add(l)
		return letras

	def transforma_archivo_str_frase(frase:string):string
		return (todas_frases.index_of(frase)+1).to_string()

	def transforma_archivo_str(palabra:string):string
		return tostring(4,todas_palabras.index_of(palabra))

	def transforma_archivo_int(palabra:string):int
		return todas_palabras.index_of(palabra)
	
	def toma_palabras_alumno(num:int):list of string  // toma "num" palabras de la lista de palabras de alumno
		palabras:list of string= new list of string
		for var i=0 to (num)
			var l= this.toma_palabra_alumno()
			while (palabras.contains(l)) 
				l = this.toma_palabra_alumno()
			palabras.add(l)
		return palabras
	
	def toma_palabras_total(num:int):list of string  // toma "num" palabras de la lista palabras total
		palabras:list of string=new list of string
		for var i=0 to (num)
			var l= this.toma_palabra_total()
			while (palabras.contains(l))
				l = this.toma_palabra_total()
			palabras.add(l)
		return palabras

	def crea_lista_de_letras_desde_palabra(s:string): list of string
		letras:list of string= new list of string
		for var i=0 to ultima(s)
			letras.add(toma_letra(s,i))
		return letras
		
	def crea_lista_de_sonidos_desde_palabra(s:string): list of string
		letras:list of string= new list of string
		var cont=0
		
		while cont <=ultima(s)
			//triples
			var triple=toma_cadena(s,cont,cont+3)
			if (triple!="") and (todas_triples.contains(triple)) 
				cont+=3
				letras.add(triple)
			else
				//dobles
				var doble=toma_cadena(s,cont,cont+2)
				if (doble!="") and (todas_dobles.contains(doble))
					cont+=2
					letras.add(doble)
				else
					//simples restantes
					var simple=toma_cadena(s,cont,cont+1)
					cont+=1
					letras.add(simple)
			
		return letras
	
	def verificar_directorio_usuario(dir:string)
		try
			var d=Dir.open( dir+"/")
			var encontrado=false
			var name=""
			while ( (name = d.read_name()) != null)
				if name=="."+nombre_programa
					encontrado=true
			
			if not encontrado
				DirUtils.create (dir+"/."+nombre_programa, 0700) 
			verificar_archivos_usuario(dir)
			
		except
			print "error"
			
	def verificar_archivos_usuario(dir:string)
		try
			for id in t.archivos_idiomas
				var d=Dir.open( dir+"/."+nombre_programa)
				var encontrado=false
				var name=""
				while ( (name = d.read_name()) != null)
					if name=="ktm_katamotz-"+id 
						encontrado=true
				
				if not encontrado
					copia_archivos_configuracion(dir,id)
		except
			print "error en verificacion de archivos"
		
	def copia_archivos_configuracion(dir:string,idioma:string)
		var f1 = FileStream.open (directorio_datos+"/predeterminados/ktm_katamotz-"+idioma, "r")
		var f2 = FileStream.open (directorio_usuario+"/ktm_katamotz-"+idioma, "w")
		var lineas= new list of string
		for var i=0 to 9
			lineas.add (f1.read_line())
		for var i=0 to 9
			f2.puts(lineas[i]+"\n")
		
	def guardar_informe(dato:string)
		// verificar la existencia del informe
		try
			var d=Dir.open( directorio_usuario+"/")
			var encontrado=false
			var name=""
			while ( (name = d.read_name()) != null)
				if name=="kti_"+datos.alumno_nombre 
					encontrado=true
			
			if not encontrado
				var f1 = FileStream.open (directorio_usuario+"/kti_"+datos.alumno_nombre, "w")
				f1.puts( dato+"\n" )
			else 
				var f1 = FileStream.open (directorio_usuario+"/kti_"+datos.alumno_nombre, "a")
				f1.puts( dato+"\n" )
		
		except
			print "error en verificacion de archivos"
		
		
	def abriendo_archivos_necesarios(nombre:string):bool
		var r=false
		// abriendo archivo de palabras
		archivo_configuracion.clear()
		
		var f = FileStream.open(directorio_usuario+"/ktm_"+nombre,"r")
		alumno_nombre=nombre
		if f==null
			print "archivo de configuración no encontrado en:"+directorio_usuario+"/ktm_"+nombre
			pass
		else
			//print "archivo de configuración encontrado"
			var c=""
			for var i=0 to 9
				c=f.read_line()
				archivo_configuracion.add(c)
				
			// configurando las letras a trabajar
			var hizkiak = archivo_configuracion[0].split("-")
			convertir_array_en_lista(hizkiak,ref this.alumno_letras)

			// configurando las palabras a trabajar
			
			var hitzak = archivo_configuracion[7].split("/")
			convertir_array_en_lista(hitzak,ref this.alumno_palabras)
			
			// toma el idioma
			this.alumno_idioma=archivo_configuracion[9]
			
			
			// abriendo archivo de palabras
			this.todas_palabras.clear();
			f = FileStream.open(directorio_datos+"/palabras/imagenes-"+this.alumno_idioma+".dat","r")
			if f!=null
				c=""
				c=f.read_line()
				while not f.eof()
					this.todas_palabras.add(c)
					c=f.read_line()
					
			// configurando los ejercicios automaticos
			this.ejercicios_automaticos.clear()
			var ej = this.archivo_configuracion[8].split("-")
			for var i in ej
				this.ejercicios_automaticos.add(int.parse(i))
			
			
			
			// guarda las consonantes predeterminadas para el idioma
			this.todas_consonantes.clear(); this.todas_vocales.clear(); this.todas_fonemas.clear()
			this.todas_triples.clear(); this.todas_dobles.clear(); this.todas_simples.clear(); this.todas_letras.clear();
			f = FileStream.open(directorio_datos+"/palabras/fonemas-"+this.alumno_idioma,"r")
			if f!=null
				c=""
				c=f.read_line()
				while not f.eof()
					if c[0:2]=="c:" do this.todas_consonantes.add(toma_cadena(c,2,longitud(c)))
					if c[0:2]=="v:" do this.todas_vocales.add(toma_cadena(c,2,longitud(c)))
					if c[0:2]=="f:" do this.todas_fonemas.add(toma_cadena(c,2,longitud(c)))
					
					if longitud(c)==5 do this.todas_triples.add(toma_cadena(c,2,longitud(c)))
					if longitud(c)==4 do this.todas_dobles.add(toma_cadena(c,2,longitud(c)))
					if longitud(c)==3 do this.todas_simples.add(toma_cadena(c,2,longitud(c)))
					
					this.todas_letras.add(toma_cadena(c,2,longitud(c)))
					c=f.read_line()
					
			// clasifica las letras del alumno según sean dobles simples triples // nota: siempre son consonates
			this.alumno_triples.clear(); this.alumno_dobles.clear(); this. alumno_simples.clear();
			for var i=0 to ultimo_de_lista(alumno_letras)
				if todas_triples.contains (alumno_letras[i]) do alumno_triples.add(alumno_letras[i])
				if todas_dobles.contains (alumno_letras[i]) do alumno_dobles.add(alumno_letras[i])
				if todas_simples.contains (alumno_letras[i]) do alumno_simples.add(alumno_letras[i])
			
			
			// coge las silabas que necesita el proyecto del archivo
			this.todas_silabas.clear()
			f = FileStream.open(directorio_datos+"/palabras/silabas-"+this.alumno_idioma,"r")
			if f!=null
				c=""
				c=f.read_line()
				while not f.eof()
					this.todas_silabas.add(c)
					c=f.read_line()
			
			
			// toma lista de definiciones
			this.todas_definiciones.clear()
			f = FileStream.open(directorio_datos+"/palabras/definiciones-"+this.alumno_idioma,"r")
			if f!=null
				c=""
				c=f.read_line()
				while not f.eof()
					this.todas_definiciones.add(c)
					c=f.read_line()
		
			
			// coge las frases del alumno y metelas en la lista
			this.todas_frases.clear()
			f = FileStream.open(directorio_datos+"/palabras/frases-"+this.alumno_idioma,"r")
			if f!=null
				c=""
				c=f.read_line()
				while not f.eof()
					this.todas_frases.add(c)
					c=f.read_line()
		
		if (ultimo_de_lista(this.alumno_palabras)>5) and (ultimo_de_lista(this.alumno_letras)>4) and (ultimo_de_lista(this.todas_palabras)>10)
			r=true
		
		return r
		
		
		
	def elegir_elemento_de_lista (lista:list of string): string
		return lista[Random.int_range(0,tamano_de_lista(lista))]
		
		
		
	def toma_una_palabra_que_empiece_con_sonido (s:string, lista:list of string ) : string
		var lista_sonidos= new list of string
		var nuevas_palabras= new list of string
		for var i=0 to ultimo_de_lista(lista)
			lista_sonidos.clear()
			lista_sonidos = crea_lista_de_sonidos_desde_palabra(lista[i])
			
			if toma_cadena(lista[i],0,longitud(s))==s
				nuevas_palabras.add(lista[i])
		var r=""
		if not lista_vacia(nuevas_palabras)
			r= nuevas_palabras[Random.int_range(0,tamano_de_lista(nuevas_palabras))]
		return r 
	
	def toma_una_palabra_que_empiece_con_letra(s:string,lista:list of string): string
		
		var nuevas_palabras= new list of string
		for var i=0 to ultimo_de_lista(lista)
			if toma_cadena(lista[i],0,longitud(s))==s
				nuevas_palabras.add(lista[i])
		var r=""
		if not lista_vacia(nuevas_palabras)
			r= nuevas_palabras[Random.int_range(0,tamano_de_lista(nuevas_palabras))]
		
		return r 
				
	def toma_una_palabra_que_tenga_sonido (s:string,lista:list of string): string
		var nuevas_palabras= new list of string
		var lista_sonidos= new list of string
		for var i=0 to ultimo_de_lista(lista)
			lista_sonidos.clear()
			lista_sonidos = crea_lista_de_sonidos_desde_palabra(lista[i])
			if lista_sonidos.contains(s)
				nuevas_palabras.add(lista[i])
		
		var r=""
		if not lista_vacia(nuevas_palabras)
			r= nuevas_palabras[Random.int_range(0,tamano_de_lista(nuevas_palabras))]
		return r 
	
	def toma_una_palabra_que_tenga_letra (s:string,lista:list of string): string
		var nuevas_palabras= new list of string
		var lista_sonidos= new list of string
		for var i=0 to ultimo_de_lista(lista)
			lista_sonidos.clear()
			lista_sonidos = crea_lista_de_letras_desde_palabra(lista[i])
			if lista_sonidos.contains(s)
				nuevas_palabras.add(lista[i])
				
		var r=""
		if not lista_vacia(nuevas_palabras)
			r= nuevas_palabras[Random.int_range(0,tamano_de_lista(nuevas_palabras))]
		return r 
	
	def divide_palabra_en_silabas(s:string):list of string
		var r= new list of string
		var arraystr= s.split ("_")
		convertir_array_en_lista(arraystr,ref r )
		return r

	def divide_frase_en_palabras(s:string):list of string
		var r= new list of string
		var arraystr= s.split (" ")
		convertir_array_en_lista(arraystr,ref r )
		return r

	def crea_lista_de_silabas(n:int):list of string
		var r= new list of string
		for var i=1 to n
			r.add(todas_silabas[Random.int_range(0,tamano_de_lista(todas_silabas))])
		return r
	
	def toma_definiciones(n:int):list of string
		var r= new list of string
		for var i=0 to (n-1)
			r.add(selecciona_item_str_azar(todas_definiciones))
		return r
		
	
	def crea_lista_de_silabas_directas_sin_repeticiones(n:int):list of string
		var r= new list of string
		for var i=1 to n
			var encontrado=false
			var vocales="aeiou"
			while encontrado==false
				var letra=toma_alumno_letra()
				var silaba=letra+toma_cadena (vocales,Random.int_range(0,4))
				if (todas_silabas.contains(silaba)) and (not r.contains(silaba))
					r.add(silaba)
					encontrado=true
		return r
	def crea_lista_de_silabas_directas_sin_repeticiones_con_letra(n:int,vocal:string):list of string
		var r= new list of string
		for var i=1 to n
			var encontrado=false
			while encontrado==false
				var letra=toma_alumno_letra()
				var silaba=letra+vocal
				if (todas_silabas.contains(silaba)) and (not r.contains(silaba))
					r.add(silaba)
					encontrado=true
		return r

	def crea_lista_de_silabas_directas_con_letra(n:int,vocal:string):list of string
		var r= new list of string
		for var i=1 to n
			var encontrado=false
			while encontrado==false
				var letra=toma_alumno_letra()
				var silaba=letra+vocal
				if (todas_silabas.contains(silaba))
					r.add(silaba)
					encontrado=true
		return r

	def crea_lista_de_silabas_directas_con_letra_diferentes(n:int,vocal:string):list of string
		var r= new list of string
		for var i=1 to n
			var encontrado=false
			var num=0
			while (encontrado==false) 
				
				var letra=toma_alumno_letra()
				var silaba=letra+vocal
				num+=1
				if (todas_silabas.contains(silaba)) and (not r.contains(silaba))
					r.add(silaba)
					encontrado=true
				if (num>1000) 
					while (encontrado==false) 
						letra=toma_letra_total_simple()
						silaba=letra+vocal
						if (todas_silabas.contains(silaba)) and (not r.contains(silaba))
							r.add(silaba)
							encontrado=true
			
		return r

	def crea_lista_de_silabas_triples_diferentes(n:int) :list of string
		var r= new list of string
		for var i=1 to n
			var encontrado=false
			while encontrado==false
				var num= Random.int_range(0,tamano_de_lista(datos.todas_silabas))
				var silaba=datos.todas_silabas[num]
				if (not r.contains(silaba)) and (longitud(silaba)==3)
					r.add(silaba)
					encontrado=true
		return r


	def crea_pseudopalabra_vocales (palabra:string):string
		avocales:array of string = {"a","e","i","o","u"}
		var vocales= convierte_array_en_lista(avocales)
		var r=palabra
		var veces=0
		while r==palabra and veces<100
			for var i=0 to ultima(r)
				var letra=toma_letra(r,i)
				if vocales.contains(letra)
					var letra_azar= selecciona_item_str_azar(vocales)
					r=sobrescribe_letra(r,letra_azar,i)
			veces+=1
		return r
		
	def crea_pseudopalabra_inversion (palabra:string):string
		var r=palabra
		if ultima(r)>2 // en caso de que la palabra sea mayor de 3 letras
			while r==palabra
				var lugar1 =Random.int_range (2,ultima(r))
				var lugar2 =lugar1-1 
				var letra1= toma_letra (r,lugar1)
				var letra2= toma_letra (r,lugar2)
				r=sobrescribe_letra(r,letra1,lugar2)
				r=sobrescribe_letra(r,letra2,lugar1)
		else
			if ultima(r)>0 // en caso de 2 o tres letras.
				var lugar1 =ultima(r)
				var lugar2 =lugar1-1 
				var letra1= toma_letra (r,lugar1)
				var letra2= toma_letra (r,lugar2)
				r=sobrescribe_letra(r,letra1,lugar2)
				r=sobrescribe_letra(r,letra2,lugar1)
		return r
		
	def crea_pseudopalabra_omision (palabra:string):string
		var r=palabra
		if ultima(r)>2 // en caso de que la palabra sea mayor de 3 letras
			while r==palabra
				var lugar1 =Random.int_range (2,ultima(r))
				r=borra_letra(r,lugar1)
		return r
		
	def crea_array_de_tipos_segun_idioma(idioma:string):list of string
		var listaejer= new list of string
		var f = FileStream.open(directorio_datos+"/palabras/ejercicios-"+idioma,"r")
		var c=""
		if f!=null
			c=""
			c=f.read_line()
			while not f.eof()
				var campos= c.split("/")
				listaejer.add (campos[ultimo_de_array(campos)])
				c=f.read_line()
		
		return listaejer

	def crea_array_de_ejercicios_segun_idioma(idioma:string):list of string
		var listaejer= new list of string
		var f = FileStream.open(directorio_datos+"/palabras/ejercicios-"+idioma,"r")
		var c=""
		if f!=null
			c=""
			c=f.read_line()
			while not f.eof()
				var campos= c.split("/")
				listaejer.add (campos[0])
				c=f.read_line()
			
		return listaejer
		

