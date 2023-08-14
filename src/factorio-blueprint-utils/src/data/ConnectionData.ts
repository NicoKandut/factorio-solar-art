export interface ConnectionData {
  /**
   * ID of the entity this connection is connected with.
   */
  entity_id: number;
  /**
   * The circuit connector id of the entity this connection is connected to, see defines.circuit_connector_id.
   */
  circuit_id: number;
}