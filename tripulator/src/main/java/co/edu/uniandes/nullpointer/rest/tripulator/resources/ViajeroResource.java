package co.edu.uniandes.nullpointer.rest.tripulator.resources;

import co.edu.uniandes.nullpointer.rest.tripulator.dtos.ViajeroDTO;
import co.edu.uniandes.nullpointer.rest.tripulator.mocks.ViajeroLogicMock;
import co.edu.uniandes.nullpointer.rest.tripulator.exceptions.TripulatorLogicException;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

/**
 *
 * @author Juan Sebastian Cardona
 */
@Path("/viajeros")
public class ViajeroResource {
    
    @Inject
	ViajeroLogicMock viajeroLogic;
    
    @GET
    public List<ViajeroDTO> getViajeros() throws TripulatorLogicException{
        return viajeroLogic.getViajeros();
    }
    
    /**
     * Obtiene un viajero
     * @param id identificador del viajero.
     * @return viajero encontrado.
     * @throws co.edu.uniandes.nullpointer.rest.tripulator.exceptions.
     * TripulatorLogicException cuando el viajero no existe
     */
    @GET
    @Path("{id: \\d+}")
    public ViajeroDTO getViaejero(@PathParam("id") Long id) throws TripulatorLogicException{
        return viajeroLogic.getViajero(id);
    }
    
        /**
     * Agrega un viajero
     * @param viajero viajerp a agregar
     * @return datos del viajero a agregar
     * @throws co.edu.uniandes.nullpointer.rest.tripulator.exceptions.TripulatorLogicException
     */
    @POST
    public ViajeroDTO createViajero(ViajeroDTO viajero) throws TripulatorLogicException {
        return viajeroLogic.createViajero(viajero);
    }
    
    /**
     * Actualiza los datos de un viajero.
     * @param id identificador del viajero a modificar
     * @param viajero viajero a modificar
     * @return datos del viajerp modificado
     * @throws TripulatorLogicException cuando no existe un viajero con el id suministrado
     */
    @PUT
    @Path("{id: \\d+}")
    public ViajeroDTO updateViajero(@PathParam("id") Long id, ViajeroDTO viajero) throws TripulatorLogicException {
        return viajeroLogic.updateViajero(id, viajero);
    }
    
    /**
     * Elimina los datos de un viajero
     * @param id identificador del viajero a eliminar
     * @throws TripulatorLogicException cuando no existe un viajero con el id suministrado
     */
    @DELETE
    @Path("{id: \\d+}")
    public void deleteViajero(@PathParam("id") Long id) throws TripulatorLogicException {
    	viajeroLogic.deleteViajero(id);
    }
}
