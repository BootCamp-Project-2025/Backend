export default interface IUseCase<Params, Response> {
    execute(params?: Params): Promise<Response> | Response;
}