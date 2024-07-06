uses Cairo



def is_alpha (x:int,y:int,imagen:Gdk.Pixbuf):bool
	var canales= imagen.get_n_channels()
	var pixfila= imagen.get_rowstride()	
	pixel:uint8*
	pixel=imagen.get_pixels()
	pixel+= 3+(y * pixfila)+ (x*canales) 	
	var r=false
	if *pixel==0 do r=true
	print r.to_string()
	return r


def colision_cuadrada (a:Control,b:Control):bool
	var res=false
	//if (a.Index!=b.Index) and (a.Visible) and (b.Visible)
	/*a - bottom right co-ordinates*/
	var ax= a.get_posx()
	var ay= a.get_posy()
	var ax1 = ax + a.get_ancho();
	var ay1 = ay + a.get_alto();
	
	/*b - bottom right co-ordinates*/
	var bx= b.get_posx()
	var by= b.get_posy()
	var bx1 = bx + b.get_ancho();
	var by1 = by + b.get_alto();
	
	/*check if bounding boxes intersect*/
	var rectcolision=true
	if((bx1 < ax) or (ax1 < bx)) do rectcolision=false
	if((by1 < ay) or (ay1 < by)) do rectcolision=false
	res=rectcolision
	return res
		
		

def colision_xy_cuadrada (x:int,y:int,a:Control):bool
	
	var res=false
	//if (a.Index!=b.Index) and (a.Visible) and (b.Visible)
	/*a - bottom right co-ordinates*/
	var ax= a.get_posx()
	var ay= a.get_posy()
	var ax1 = ax + a.get_ancho();
	var ay1 = ay + a.get_alto();
	
	
	/*check if bounding boxes intersect*/
	var rectcolision=true
	if((x < ax) or (x > ax1)) do rectcolision=false
	if((y < ay) or (y > ay1)) do rectcolision=false
	res=rectcolision
	return res

	


def get_rojo (color:string):double
	var c=color.split("#")
	return double.parse(c[0])
	

def get_verde (color:string):double
	var c=color.split("#")
	return double.parse(c[1])
	

def get_azul (color:string):double
	var c=color.split("#")
	return double.parse(c[2])
	
def convierte_a_string (r:double, g:double,b:double):string
	return r.to_string()+"#"+g.to_string()+"#"+b.to_string()


class Control: Object
	tipo:string
	pagina:int=0
	
	arrastrable:bool=true
	ampliable:bool=false
	editable:bool=false
	seleccionado:bool=false
	figurafondo:bool=false
	visible:bool=true
	
	valor_int:int=0
	valor_str:string
	valor_bool:bool
	valor_int2:int=0
	valor_str2:string
	valor_bool2:bool
	
	x:int=0
	y:int=0
	ancho:int=0
	alto:int=0
	
	tomado_x:int
	tomado_y:int

	direccion:string
	archivo:string=""

	pixbufer: Gdk.Pixbuf=null
	pixbufer_original: Gdk.Pixbuf=null

	fondo:bool=true
	borde:bool=false
	letra:bool=true
	colorfondo:string
	colorborde:string
	colorletra:string
	grosorborde:int=5
	tipoletra:string
	tamanotexto:double=20
	
	texto:  string
	cursor_buffer:int=0

	event izq_pulsado(c:Control)
	event der_pulsado(c:Control)
	event soltado(c:Control)
	
	
	init
		texto=" "
		tipo=""
		colorfondo="1#1#1"
		colorletra="0#0#0"
		colorborde="0#0#0"
		tipoletra=fuentes.letra
	
	def virtual set_escala(ancho:int,alto:int)
		pass
	def virtual set_anchoborde(ancho:int)
		pass
	def virtual set_imagen (nombreImagen:string)
		pass
	def virtual set_tamanotexto(n:int)
		pass
	def virtual get_texto (): string
		return ""
	def virtual set_fondovisible (estado:bool)
		pass
	def virtual set_letravisible (estado:bool)
		pass
	def virtual set_texto (t:string)
		pass
	def virtual set_color_list(lista:list of int)
		pass
	def virtual set_borde(borde:bool)
		pass
	def virtual set_colorfondo(color:string)
		pass
	def virtual set_colorborde(color:string)
		pass
	def virtual set_colorletra(color:string)
		pass
	def virtual get_ancho():int
		return 0
	def virtual get_alto():int
		return 0
	def virtual get_centro_x():int
		return 0
	def virtual get_centro_y():int
		return 0
	def virtual set_centro_x(x:int)
		pass
	def virtual set_centro_y(x:int)
		pass
	def virtual set_ancho(w:int)
		pass
		
	def virtual set_alto(h:int)
		pass
	def virtual set_tamano(w:int, h:int)
		pass
	def virtual get_posx():int
		return 0
	def virtual get_posy():int
		return 0
	def virtual set_posx(n:int)
		pass
	def virtual set_posy(n:int)
		pass
	def virtual pinta (ctx:Cairo.Context)
		pass
	def virtual gestiona_tecla(valor:uint,tecla:string)
		pass
