import redis

# Conexión básica al servidor Redis de la base de datos en la nube en el puerto 11227
r = redis.Redis(
  host='redis-11277.c240.us-east-1-3.ec2.redns.redis-cloud.com', 
  port=11277, 
  db=0, 
  username='default', 
  password='a2k3N6pI1ZyTHoYMgjjRPLppwjugjIYa',
  socket_connect_timeout=5,
  socket_timeout=5
)

# Obtener saldo cliente
def obtener_saldo_cuenta(id_cuenta):
  try:
    # Construir la clave del saldo del cliente
    clave_saldo = f'cuenta:{id_cuenta}'
    # Hacer un HGET a la base de datos, se obtiene el campo 'saldo' del hash
    saldo = r.hget(clave_saldo, 'saldo')
    if saldo:
      saldo = float(saldo.decode('utf-8'))
      print(f'El saldo del cliente es de ${saldo:.2f}')
    else:
      print(f'No se encontró saldo para el cliente {id_cuenta}')
  except redis.ConnectionError:
    print('La conexion al servidor no fue exitosa')
  except Exception as e:
    print(f'Hubo un error: {e}')
obtener_saldo_cuenta(2)
  